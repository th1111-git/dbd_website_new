const BASE_URL = 'https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Events?view=Grid%20view'
const token = 'pat2bEq3dsaXHSBH9.2edd33a7b1c2de8fd5e4fe14b82900cf807d2c9b56dfead6a8bdd48715826409'

async function main() {
  const res = await fetch(BASE_URL, {
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
  console.log(`Fetched ${data.records.length} records:`)
  for (const record of data.records) {
    console.log(JSON.stringify({
      id: record.id,
      fields: record.fields
    }, null, 2))
  }
}

main()
