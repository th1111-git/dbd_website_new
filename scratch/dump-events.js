const fs = require('fs')
const path = require('path')

const token = 'pat2bEq3dsaXHSBH9.2edd33a7b1c2de8fd5e4fe14b82900cf807d2c9b56dfead6a8bdd48715826409'
const baseId = 'appHwUzo4ARCQQlwr'
const tableName = 'Events'

async function fetchAllRecords() {
  let allRecords = []
  let offset = null

  do {
    let url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?view=Grid%20view`
    if (offset) {
      url += `&offset=${offset}`
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    if (!res.ok) {
      console.error(`Airtable API returned ${res.status}`)
      process.exit(1)
    }

    const data = await res.json()
    allRecords = allRecords.concat(data.records)
    offset = data.offset
  } while (offset)

  console.log(`Total records fetched: ${allRecords.length}`)
  
  const recordsInfo = allRecords.map(r => ({
    id: r.id,
    name: r.fields.Name,
    date: r.fields.Date,
    type: r.fields.Type,
    link: r.fields.Link || null,
    description: r.fields.Description || null,
    files: r.fields.Files ? r.fields.Files.map(f => f.url) : []
  }))

  fs.writeFileSync('scratch/all-events-dump.json', JSON.stringify(recordsInfo, null, 2))
  console.log('Dumped to scratch/all-events-dump.json')
}

fetchAllRecords()
