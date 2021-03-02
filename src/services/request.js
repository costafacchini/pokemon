export default async function request(url) {
  const response = await fetch(url)

  return response.ok ? response.json() : response.text()
}
