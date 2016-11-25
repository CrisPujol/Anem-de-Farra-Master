const MongoClient = require('mongodb').MongoClient
const request = require('request')
const throttledRequest = require('throttled-request')(request);
const cheerio = require('cheerio');
const moment = require("moment");

const startedAt = Date.now();

const SEPARATOR = "-".repeat(30);
let total;

const url = "mongodb://localhost:27017/anemdefarra"
let page = +(process.argv[2])-1 || 0
let limit = 15
let skip = ( limit * page );

throttledRequest.configure({
  requests: 1,
  milliseconds: 2000
});//This will throttle the requests so no more than 5 are made every second 


throttledRequest.on('request', function (link) {
  const timeSpent = Math.round((Date.now() - startedAt) / 1000)
  console.log(SEPARATOR)
  console.log(`*REQ  Making a request to ${link}`)
  console.log(`*REQ  Elapsed time: ${ timeSpent } s`);
});
 

// npm run parse-details 1

MongoClient.connect(url, (err, db) => {

    if (err) throw err; 

    db.collection("feasts")
        .find({}, { link:1 })
        .skip(skip)
        .limit(limit)
        .toArray()
        .then( data => data.map( feast => feast.link) )
        .then( links => {

            total = links.length;

            //links  = links.filter ( link => link !== "http://www.viulafesta.cat/activitat/festa-major-de-sant-valenti-a-les-cabanyes/" )            
            links  = links.filter ( link => link !== "http://www.viulafesta.cat/activitat/festa-del-roser-de-sant-joan-les-fonts-2/" )            

            return links.map( link => {

                return new Promise((resolve,reject) => {

                    const itemRequest = throttledRequest(link, (error, response, body) => {
                        resolve(body)
                    })
                    .on('response', function (data) {
                        const timeSpent = Math.round((Date.now() - startedAt) / 1000)
                        console.log(SEPARATOR)
                        console.log(`=> RES  Got response from ${data.request.href}`);
                        console.log(`=> RES  Elapsed time: ${timeSpent} s` );
                        console.log(`=> RES  ${--total} left` );
                    });

                    return itemRequest;

                })
            })

        })
        .then( arrayPromises => {

            return Promise.all(arrayPromises)
                .then( (dataPromises) => {
                    return dataPromises.map( (body) => {

                        let $ = cheerio.load(body);

                        // SELECTIONS
                        const $name = $(".fitxa-activitat h1");
                        const $region = $(".municipi");
                        const $objectCoords = $(".cgmp-data-placeholder")[0].children[0]
                        const $shire = $(".comarca"); 
                        const $dateStartWhenFreq = $(".fitxa-activitat .grid_4 .content").eq(0).find("span").remove().end().html().split("<br>")
                        const $dateFiniShschedule = $(".fitxa-activitat .grid_4 .content").eq(1).find("span").remove().end().html().split("<br>")
                        const $hall = $(".fitxa-activitat .grid_2 .content").find("a").eq(1)

     
                        // DATA IN SELECTIONS
                        const name = $name.text().trim()
                        const region = $region.text().trim()
                        const shire = $shire.text().trim()
                        const frequency = $dateStartWhenFreq[1].trim()
                        const place = $dateStartWhenFreq[2].trim()

                        //Convert date to timestamp
                        // START DATE
                        const startDateTxt = $dateStartWhenFreq[0].trim()
                        const startDateTempArray = startDateTxt.split("/");
                        const startDateFormatOk = startDateTempArray[1] + "/" + startDateTempArray[0] + "/" + startDateTempArray[2];
                        const startDate = new Date(startDateFormatOk).getTime()

                        // FINISH DATE
                        const finishDateTxt = $dateFiniShschedule[0].trim();
                        const finishDateTempArray = finishDateTxt.split("/");
                        const finishDateFormatOk = finishDateTempArray[1] + "/" + finishDateTempArray[0] + "/" + finishDateTempArray[2];
                        const finishDate = new Date(finishDateFormatOk).getTime()


                        const shschedule = $dateFiniShschedule[1].trim()
                        const hallweb = $hall.attr("href")
                        
                   
                        const jsonCoordsData = $objectCoords.attribs.value;
                        const oCoordsData = JSON.parse(jsonCoordsData);
                        const coordsData = oCoordsData.markerlist;
                        const aCoords = coordsData.split("{}");
                        const coords =  aCoords[aCoords.length-1];
                        const coordsArray = coords.split(",");
                        const coordRegionString = coordsArray.reverse();
                        const coordRegion = coordRegionString.map ( elem => Number(elem) )

                        return ({ name, region, coordRegion, shire, frequency, place, shschedule, hallweb, startDate, finishDate, startDateTxt, finishDateTxt  })
                    })
                })
                .then( data => {
                    const timeSpent = Math.round((Date.now() - startedAt) / 1000);
                    console.log(SEPARATOR)
                    console.log(`TOTAL Time Spent: ${timeSpent} s` );
                    console.log(data)
                })

        })
        .then( () => db.close() )
        .catch( err => new Error(err) )

});




