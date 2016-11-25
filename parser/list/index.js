const path = require('path')
const readFile = require('fs-readfile-promise');
const cheerio = require('cheerio');
const fileName = process.argv[2] // node app festas2.html

const pathFile = path.join(__dirname, '../data', fileName)

readFile(pathFile)
	.then( htmlString => {

		let $ = cheerio.load(htmlString)

		const blocksInfo = $(".small-feature");
		let festes = [];
		
		blocksInfo.each( (i, block) => {

			const $currentTitle = $(block).find("h4")
			const $linkMoreInfo = $currentTitle.find("a")
			const $dateFesta =  $(block).find(".date.updated")
			const $municipiFesta =  $(block).find(".meta-municipi")

			const title = $currentTitle.text().trim()
			const date = $dateFesta.text().trim()
			const link = $linkMoreInfo.attr("href")
			const municipi = $municipiFesta.text().trim()

			festes.push({ title, date, link, municipi })

		})

		console.log (festes)
		console.log(`There ara ${blocksInfo.length} blocks w/ info... `)
	})
	.catch( err => console.log(err) )

