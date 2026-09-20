const renderGifts = async () => {
  const response = await fetch('/gifts')
  const data = await response.json()

  const mainContent = document.getElementById('main-content')

  if (data) {
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
    const message = document.createElement('h2')
    message.textContent = 'No Gifts Available 😞'
    mainContent.appendChild(message)
  }
}

const requestedUrl = window.location.href.split('/').pop()

if (requestedUrl) {
  window.location.href = '/404.html'
} else {
  renderGifts()
}
