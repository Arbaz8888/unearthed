const mainContent = document.getElementById('main-content')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const searchStatus = document.getElementById('search-status')

const renderGifts = async (search = '') => {
  const url = search ? `/api/gifts?search=${encodeURIComponent(search)}` : '/api/gifts'
  const response = await fetch(url)
  const data = await response.json()

  mainContent.innerHTML = ''

  if (response.ok && data.length > 0) {
    const noun = data.length === 1 ? 'find' : 'finds'
    searchStatus.textContent = search ? `${data.length} ${noun} for “${search}”` : `${data.length} ${noun}`

    data.map(gift => {
      const card = document.createElement('div')
      card.className = 'card'

      const topContainer = document.createElement('div')
      topContainer.className = 'top-container'
      topContainer.style.backgroundImage = `url("${gift.image}")`

      const bottomContainer = document.createElement('div')
      bottomContainer.className = 'bottom-container'

      const name = document.createElement('h3')
      name.textContent = gift.name
      bottomContainer.appendChild(name)

      const price = document.createElement('p')
      price.textContent = gift.pricePoint
      bottomContainer.appendChild(price)

      const audience = document.createElement('p')
      audience.textContent = gift.audience
      bottomContainer.appendChild(audience)

      const link = document.createElement('a')
      link.textContent = 'Read More >'
      link.href = `/gifts/${gift.id}`
      link.role = 'button'
      bottomContainer.appendChild(link)

      card.appendChild(topContainer)
      card.appendChild(bottomContainer)

      mainContent.appendChild(card)
    })
  } else {
    searchStatus.textContent = ''

    const message = document.createElement('h2')
    message.textContent = search ? `No gifts match “${search}” 😞` : 'No Gifts Available 😞'
    mainContent.appendChild(message)
  }
}

searchForm.addEventListener('submit', event => {
  event.preventDefault()
  renderGifts(searchInput.value.trim())
})

searchInput.addEventListener('input', () => {
  if (searchInput.value.trim() === '') renderGifts()
})

const requestedUrl = window.location.href.split('/').pop()

if (requestedUrl) {
  window.location.href = '/404.html'
} else {
  renderGifts()
}
