const cheerio = require('cheerio');
const axios = require('axios');

async function info(slug) {

    let ch_list = []
    let author = []
    let genres = []

    res = await axios.get(`https://manhwa18.net/${slug}.html`)
    const body = await res.data;
    const $ = cheerio.load(body)

    let manhwa_title = $('.manga-info h1').text().trim()
    let authors = $('body > div.container > div.col-lg-8.col-sm-8.info-manga > div > div:nth-child(4) > div.col-md-8 > ul > li:nth-child(4) a')
    
    $(authors).each((i,e)=>{
        author.push($(e).text())
    })

    let genres_e = $('body > div.container > div.col-lg-8.col-sm-8.info-manga > div > div:nth-child(4) > div.col-md-8 > ul > li:nth-child(5) a')
    
    $(genres_e).each((i,e)=>{
        genres.push($(e).text())
    })

    $('tbody tr').each((index, element) => {

            $elements = $(element)
            title = $elements.find('a').text().trim()
            url = $elements.find('a').attr('href')
            time = $elements.find('time').text().trim()

            ch_list.push({'ch_title': title, 'time': time, 'url': url})     
    })

    let other_name = $('body > div.container > div.col-lg-8.col-sm-8.info-manga > div > div:nth-child(4) > div.col-md-8 > ul > li:nth-child(3)').text()
    
    let status = $('body > div.container > div.col-lg-8.col-sm-8.info-manga > div > div:nth-child(4) > div.col-md-8 > ul > li:nth-child(6) a').text()
    
    let description = $('body > div.container > div.col-lg-8.col-sm-8.info-manga > div > div:nth-child(5) > p').text()

     return await ({
        'page': manhwa_title,
        'other_name': other_name,
        'authors': author,
        'genres':genres,
        'status': status,
        'description': description,
        'list': ch_list
    })

}

async function all(slug) {

    let m_list = []

    res = await axios.get(`https://manhwa18.net/manga-list.html?listType=allABC`)
    const body = await res.data;
    const $ = cheerio.load(body)

    $('#Character span').each((index, element) => {

            $elements = $(element)
            title = $elements.find('a').text().trim()
            url = $elements.find('a').attr('href')

            m_list.push({'ch_title': title, 'url': url})     
    })

     return await ({
        'title': 'All Manga',
        'list': m_list
    })

}

async function latest(page) {

    let m_list = []

    res = await axios.get(`https://manhwa18.net/manga-list.html?listType=pagination&page=${page}&artist=&author=&group=&m_status=&name=&genre=&ungenre=&sort=last_update&sort_type=DESC`)
    const body = await res.data;
    const $ = cheerio.load(body)

    $('body > div.container > div.row > div.col-lg-9.col-md-8 > div.row.top > div .row-list').each((index, element) => {

            $elements = $(element)
            image = $elements.find('.media').find('img').attr('src').replace('https://manhwa18.com','')
            url = $elements.find('.media').find('a').attr('href')
            title = $elements.find('.media-body').find('h3').text().trim()
            genres_e = $elements.find('.media-body').find('small')
            last_ch = $elements.find('.media-body a').eq(-1).text().trim()
            last_ch_url = $elements.find('.media-body a').eq(-1).attr('href')

            let genres = []
            
            $(genres_e).each((i,e)=>{
                genres.push($(e).text())
            })

            m_list.push({'title': title, 'image': 'https://manhwa18.com'+image, 'url': url, 'genres': genres, 'last_ch': last_ch, 'last_ch_url': last_ch_url})     
    })

    let current = $('.pagination .active').text()
    
    let last_page = $('body > div.container > div.row > div.col-lg-9.col-md-8 > div.pagination-wrap > ul > li').eq(-2).find('a').text()
    
     return await ({
        'title': 'All Manga',
        'list': m_list,
        'current_page': current,
        'last_page': last_page
    })

}


async function chapter(slug) {

    let ch_list = []

    res = await axios.get(`https://manhwa18.net/${slug}.html`)
    const body = await res.data;
    const $ = cheerio.load(body)

    $('.chapter-content img').each((index, element) => {

            $elements = $(element)
            image = $elements.attr('src').trim()

            ch_list.push({'ch': image})     
    })

    let manga_title = $('body > div.container > div > ol > li:nth-child(3) > a > span').text()
    let manga_url = $('body > div.container > div > ol > li:nth-child(3) > a').attr('href')
    
    let current_ch = $('body > div.container > div > ol > li:nth-child(4) > a > span').text()
    
    let last_page = $('body > div:nth-child(13) > ul > li > div > div > select > option').eq(1).text().trim()
    let last_page_url = $('body > div:nth-child(13) > ul > li > div > div > select > option').eq(1).attr('value')
    

    return await ({
        'manga': manga_title,
        'manga_url':manga_url,
        'current_ch': current_ch,
        'chapters': ch_list,
        'last_page':[{
            'ch_name': last_page,
            'url': last_page_url
        }]
    })

}

module.exports = {
	latest,
    all,
    info,
    chapter
}