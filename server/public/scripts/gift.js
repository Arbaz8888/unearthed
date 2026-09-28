const renderGift = async () => {
  const requestedID = parseInt(window.location.href.split('/').pop())
  const giftContent = document.getElementById('gift-content')

  const showNotFound = () => {
    giftContent.innerHTML = ''
    giftContent.className = 'not-found'

    const message = document.createElement('h2')
    message.textContent = 'No Gifts Available 😞'
    giftContent.appendChild(message)
  }

  if (Number.isNaN(requestedID)) {
    showNotFound()
    return
  }

  const response = await fetch(`/api/gifts/${requestedID}`)

  if (!response.ok) {
    showNotFound()
    return
  }

  const gift = await response.json()

  const image = document.getElementById('image')
  image.src = gift.image
  image.alt = gift.name

  document.getElementById('name').textContent = gift.name
  document.getElementById('submittedBy').textContent = `Submitted by ${gift.submittedBy}`
  document.getElementById('submittedOn').textContent = `Submitted on ${gift.submittedOn}`
  document.getElementById('pricePoint').textContent = gift.pricePoint
  document.getElementById('audience').textContent = gift.audience
  document.getElementById('description').textContent = gift.description

  document.title = `${gift.name} | UnEarthed`
}

renderGift()
