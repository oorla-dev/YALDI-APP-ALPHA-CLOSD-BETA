// 🎵 YALDI Music App - Complete JavaScript with Enhanced Features

class YaldiMusicApp {
  constructor() {
    this.currentTrack = null
    this.isPlaying = false
    this.currentTime = 0
    this.duration = 0
    this.volume = 0.7
    this.isRepeat = false
    this.isShuffle = false
    this.currentAlbum = null
    this.currentTrackIndex = 0
    this.cart = []
    this.preferences = this.loadPreferences()
    this.currentView = "main-view"

    this.init()
  }

  init() {
    this.loadAlbums()
    this.loadProducts()
    this.loadEvents()
    this.setupEventListeners()
    this.setupPlayer()
    this.setupPreferences()
    this.applyTheme()
    this.showToast("🎵 Benvenuto in YALDI Music!")
  }

  // 📱 Data Management
  loadPreferences() {
    const defaultPrefs = {
      notificationsEnabled: true,
      language: "it",
      autoplay: true,
      downloadQuality: "medium",
      showLyrics: true,
      darkMode: false,
      saveHistory: true,
      downloadOverWifi: true,
      volumeNormalization: true,
      privateMode: false,
      shareLocation: false,
      personalizedAds: true,
      debugMode: false,
      performanceMode: true,
      screenMode: "auto",
      autoUpdates: true,
      equalizer: { enabled: false, bass: 0, mid: 0, treble: 0 },
    }

    const saved = localStorage.getItem("yaldi-preferences")
    return saved ? { ...defaultPrefs, ...JSON.parse(saved) } : defaultPrefs
  }

  savePreferences() {
    localStorage.setItem("yaldi-preferences", JSON.stringify(this.preferences))
  }

  // 🎵 Album Data
  getAlbumsData() {
    return [
      {
        id: 1,
        title: "YALDHI",
        artist: "YALDI",
        year: 2024,
        cover: "/images/yaldhi.png",
        tracks: [
          { id: 1, title: "THE GARDEN OF ALDI", duration: "3:45", audioUrl: "/YALDHI/01 THE GARDEN OF ALDI.mp3" },
          { id: 2, title: "THE ALDI STORM", duration: "4:12", audioUrl: "/YALDHI/02 THE ALDI STORM.m4a" },
          { id: 3, title: "NEW ALDI", duration: "3:28", audioUrl: "/YALDHI/03 NEW ALDI.mp3" },
          { id: 4, title: "80 ALDYIES", duration: "4:01", audioUrl: "/YALDHI/04 80 ALDYIES.m4a" },
          { id: 5, title: "ALDI IN THE SKY", duration: "3:55", audioUrl: "/YALDHI/05 ALDI IN THE SKY.mp3" },
          { id: 6, title: "ALDIEN", duration: "4:33", audioUrl: "/YALDHI/06 ALDIEN.mp3" },
          { id: 7, title: "BROTHERS OF ALDI", duration: "3:17", audioUrl: "/YALDHI/07 BROTHERS OF ALDI.mp3" },
          { id: 8, title: "FVCK GIANVOIT", duration: "4:44", audioUrl: "/YALDHI/08 FVCK GIANVOIT.mp3" },
        ],
      },
      {
        id: 2,
        title: "DONDA 2",
        artist: "YALDI",
        year: 2024,
        cover: "/images/donda2.jpg",
        tracks: [
          { id: 9, title: "SECURITY", duration: "2:58", audioUrl: "/placeholder-audio.mp3" },
          { id: 10, title: "WE DID IT KID", duration: "3:42", audioUrl: "/placeholder-audio.mp3" },
        ],
      },
      {
        id: 3,
        title: "JL2",
        artist: "YALDI",
        year: 2023,
        cover: "/images/jl2.jpg",
        tracks: [
          { id: 11, title: "INTRO", duration: "1:23", audioUrl: "/placeholder-audio.mp3" },
          { id: 12, title: "LIFESTYLE", duration: "3:15", audioUrl: "/placeholder-audio.mp3" },
        ],
      },
    ]
  }

  // 🛍️ Products Data
  getProductsData() {
    return [
      {
        id: 1,
        name: "🧥 YALDI HOODIE",
        price: "€89.99",
        image: "/images/hoodie.jpg",
        category: "apparel",
        sizes: ["S", "M", "L", "XL"],
      },
      {
        id: 2,
        name: "💿 YALDHI CD",
        price: "€19.99",
        image: "/images/yaldhicd.png",
        category: "music",
        sizes: ["Standard"],
      },
      {
        id: 3,
        name: "👕 YALDI TEE",
        price: "€39.99",
        image: "/images/buldy.jpg",
        category: "apparel",
        sizes: ["S", "M", "L", "XL"],
      },
    ]
  }

  // 📅 Events Data
  getEventsData() {
    return [
      {
        id: 1,
        title: "🎤 YALDI LIVE TOUR",
        subtitle: "Concerto Esclusivo",
        description: "Esperienza musicale unica con YALDI dal vivo",
        location: "Milano, Italia",
        venue: "Mediolanum Forum",
        date: "15 Marzo 2024",
      },
      {
        id: 2,
        title: "🎧 LISTENING PARTY",
        subtitle: "Anteprima Album",
        description: "Ascolta in anteprima i nuovi brani di YALDI",
        location: "Roma, Italia",
        venue: "Auditorium Parco della Musica",
        date: "22 Marzo 2024",
      },
    ]
  }

  // 🎵 Album Loading
  loadAlbums() {
    const albumGrid = document.getElementById("album-grid")
    if (!albumGrid) return

    const albums = this.getAlbumsData()
    albumGrid.innerHTML = albums
      .map(
        (album) => `
            <div class="album-item" data-album-id="${album.id}">
                <div class="album-image-container">
                    <img src="${album.cover}" alt="${album.title}" loading="lazy">
                    <div class="album-overlay">
                        <span>▶️</span>
                    </div>
                </div>
                <div class="album-title">${album.title}</div>
                <div class="album-year">${album.year}</div>
            </div>
        `,
      )
      .join("")

    // Add click listeners
    albumGrid.querySelectorAll(".album-item").forEach((item) => {
      item.addEventListener("click", () => {
        const albumId = Number.parseInt(item.dataset.albumId)
        this.openAlbum(albumId)
      })
    })
  }

  openAlbum(albumId) {
    const album = this.getAlbumsData().find((a) => a.id === albumId)
    if (!album) return

    this.currentAlbum = album
    this.showView("album-detail-view")

    // Update album details
    document.getElementById("detail-album-title").textContent = album.title
    document.getElementById("detail-album-title-large").textContent = album.title
    document.getElementById("detail-album-year").textContent = album.year
    document.getElementById("detail-album-tracks-count").textContent = `${album.tracks.length} brani`
    document.getElementById("detail-album-cover").src = album.cover

    // Load tracks
    this.loadTracks(album.tracks)
  }

  loadTracks(tracks) {
    const tracksList = document.getElementById("tracks-list")
    if (!tracksList) return

    tracksList.innerHTML = tracks
      .map(
        (track, index) => `
            <div class="track-item" data-track-index="${index}">
                <div class="track-left">
                    <div class="track-icon">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="track-name">${track.title}</div>
                </div>
                <div class="track-duration">${track.duration}</div>
            </div>
        `,
      )
      .join("")

    // Add click listeners
    tracksList.querySelectorAll(".track-item").forEach((item) => {
      item.addEventListener("click", () => {
        const trackIndex = Number.parseInt(item.dataset.trackIndex)
        this.playTrack(trackIndex)
      })
    })
  }

  // 🛍️ Products Loading
  loadProducts() {
    const productsGrid = document.getElementById("products-grid")
    if (!productsGrid) return

    const products = this.getProductsData()
    productsGrid.innerHTML = products
      .map(
        (product) => `
            <div class="product-item" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
                <button class="add-to-cart-btn" onclick="app.addToCart(${product.id})">
                    🛒 Aggiungi al Carrello
                </button>
            </div>
        `,
      )
      .join("")
  }

  // 📅 Events Loading
  loadEvents() {
    const eventsGrid = document.getElementById("events-grid")
    if (!eventsGrid) return

    const events = this.getEventsData()
    eventsGrid.innerHTML = events
      .map(
        (event) => `
            <div class="event-card">
                <div class="event-title">${event.title}</div>
                <div class="event-subtitle">${event.subtitle}</div>
                <div class="event-desc">${event.description}</div>
                <div class="event-location">📍 ${event.location}</div>
                <div class="event-venue">🏟️ ${event.venue}</div>
                <div class="event-date">📅 ${event.date}</div>
            </div>
        `,
      )
      .join("")
  }

  // 🎵 Player Functions
  setupPlayer() {
    this.audioElement = document.getElementById("audio-player")
    if (!this.audioElement) {
      this.audioElement = document.createElement("audio")
      this.audioElement.id = "audio-player"
      document.body.appendChild(this.audioElement)
    }

    this.audioElement.volume = this.volume

    // Audio event listeners
    this.audioElement.addEventListener("timeupdate", () => {
      this.currentTime = this.audioElement.currentTime
      this.updateProgress()
    })

    this.audioElement.addEventListener("loadedmetadata", () => {
      this.duration = this.audioElement.duration
      this.updateTimeDisplay()
    })

    this.audioElement.addEventListener("ended", () => {
      this.handleTrackEnd()
    })
  }

  playTrack(trackIndex) {
    if (!this.currentAlbum || !this.currentAlbum.tracks[trackIndex]) return

    this.currentTrackIndex = trackIndex
    this.currentTrack = this.currentAlbum.tracks[trackIndex]

    // Update UI
    this.updatePlayerUI()
    this.updateTrackHighlight()

    // Load and play audio
    this.audioElement.src = this.currentTrack.audioUrl
    this.audioElement.load()

    if (this.preferences.autoplay) {
      this.play()
    }

    // Show player
    document.getElementById("player-container").style.display = "block"

    // Save to history
    if (this.preferences.saveHistory) {
      this.saveToHistory(this.currentTrack)
    }
  }

  play() {
    this.audioElement
      .play()
      .then(() => {
        this.isPlaying = true
        this.updatePlayButtons()
        this.showAndroidNotification(`🎵 In riproduzione: ${this.currentTrack.title}`)
      })
      .catch((error) => {
        console.error("Errore riproduzione:", error)
        this.showToast("❌ Errore nella riproduzione")
      })
  }

  pause() {
    this.audioElement.pause()
    this.isPlaying = false
    this.updatePlayButtons()
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  nextTrack() {
    if (!this.currentAlbum) return

    let nextIndex
    if (this.isShuffle) {
      nextIndex = Math.floor(Math.random() * this.currentAlbum.tracks.length)
    } else {
      nextIndex = (this.currentTrackIndex + 1) % this.currentAlbum.tracks.length
    }

    this.playTrack(nextIndex)
  }

  previousTrack() {
    if (!this.currentAlbum) return

    let prevIndex
    if (this.isShuffle) {
      prevIndex = Math.floor(Math.random() * this.currentAlbum.tracks.length)
    } else {
      prevIndex = this.currentTrackIndex === 0 ? this.currentAlbum.tracks.length - 1 : this.currentTrackIndex - 1
    }

    this.playTrack(prevIndex)
  }

  handleTrackEnd() {
    if (this.isRepeat) {
      this.audioElement.currentTime = 0
      this.play()
    } else {
      this.nextTrack()
    }
  }

  updatePlayerUI() {
    if (!this.currentTrack) return

    // Mini player
    document.getElementById("player-track-title").textContent = this.currentTrack.title
    document.getElementById("player-track-album").textContent = this.currentAlbum.title
    document.getElementById("player-artwork").src = this.currentAlbum.cover

    // Expanded player
    document.getElementById("expanded-track-title").textContent = this.currentTrack.title
    document.getElementById("expanded-track-artist").textContent = this.currentAlbum.artist
    document.getElementById("expanded-album-title").textContent = this.currentAlbum.title
    document.getElementById("expanded-artwork").src = this.currentAlbum.cover
  }

  updatePlayButtons() {
    const playBtns = document.querySelectorAll(".play-btn, .play-btn-large")
    playBtns.forEach((btn) => {
      const icon = btn.querySelector("i")
      if (icon) {
        icon.className = this.isPlaying ? "fas fa-pause" : "fas fa-play"
      }
    })
  }

  updateProgress() {
    if (!this.duration) return

    const progress = (this.currentTime / this.duration) * 100
    const progressBar = document.getElementById("progress-bar")
    if (progressBar) {
      progressBar.style.width = `${progress}%`
    }

    this.updateTimeDisplay()
  }

  updateTimeDisplay() {
    const currentTimeEl = document.getElementById("current-time")
    const totalTimeEl = document.getElementById("total-time")

    if (currentTimeEl) currentTimeEl.textContent = this.formatTime(this.currentTime)
    if (totalTimeEl) totalTimeEl.textContent = this.formatTime(this.duration)
  }

  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  updateTrackHighlight() {
    // Remove previous highlights
    document.querySelectorAll(".track-item").forEach((item) => {
      item.classList.remove("active")
      const icon = item.querySelector(".track-icon i")
      if (icon) icon.className = "fas fa-play"
    })

    // Highlight current track
    const currentTrackEl = document.querySelector(`[data-track-index="${this.currentTrackIndex}"]`)
    if (currentTrackEl) {
      currentTrackEl.classList.add("active")
      const icon = currentTrackEl.querySelector(".track-icon i")
      if (icon) icon.className = this.isPlaying ? "fas fa-pause" : "fas fa-play"
    }
  }

  // 🛒 Cart Functions
  addToCart(productId) {
    const product = this.getProductsData().find((p) => p.id === productId)
    if (!product) return

    if (product.sizes && product.sizes.length > 1) {
      this.showSizeSelector(product)
    } else {
      this.addProductToCart(product, product.sizes ? product.sizes[0] : null)
    }
  }

  addProductToCart(product, size = null) {
    const cartItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1,
    }

    this.cart.push(cartItem)
    this.updateCartBadge()
    this.showToast(`🛒 ${product.name} aggiunto al carrello!`)
  }

  updateCartBadge() {
    const badge = document.getElementById("cart-badge")
    if (badge) {
      if (this.cart.length > 0) {
        badge.textContent = this.cart.length
        badge.style.display = "flex"
      } else {
        badge.style.display = "none"
      }
    }
  }

  showSizeSelector(product) {
    const modal = document.getElementById("size-modal")
    const productName = document.getElementById("size-product-name")
    const sizeOptions = modal.querySelector(".size-options")

    if (productName) productName.textContent = product.name

    if (sizeOptions) {
      sizeOptions.innerHTML = product.sizes
        .map((size) => `<button class="size-btn" data-size="${size}">${size}</button>`)
        .join("")

      sizeOptions.querySelectorAll(".size-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const size = btn.dataset.size
          this.addProductToCart(product, size)
          this.hideSizeSelector()
        })
      })
    }

    modal.style.display = "flex"
  }

  hideSizeSelector() {
    document.getElementById("size-modal").style.display = "none"
  }

  // 🎛️ Preferences Functions
  setupPreferences() {
    this.loadPreferencesUI()
  }

  loadPreferencesUI() {
    // This would be called when preferences view is shown
    // Implementation depends on the specific preferences structure
  }

  updatePreference(key, value) {
    this.preferences[key] = value
    this.savePreferences()
    this.applyPreferences()
    this.showToast("✅ Impostazioni salvate")
  }

  applyPreferences() {
    // Apply volume normalization
    if (this.preferences.volumeNormalization && this.audioElement) {
      // Implement volume normalization logic
    }

    // Apply equalizer settings
    if (this.preferences.equalizer.enabled) {
      this.applyEqualizer()
    }

    // Apply performance mode
    if (this.preferences.performanceMode) {
      this.enablePerformanceMode()
    }
  }

  applyEqualizer() {
    // Implement equalizer logic
    console.log("🎚️ Equalizzatore applicato:", this.preferences.equalizer)
  }

  enablePerformanceMode() {
    // Optimize performance
    document.body.classList.add("performance-mode")
  }

  // 🎨 Theme Functions
  applyTheme() {
    if (this.preferences.darkMode) {
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      document.documentElement.removeAttribute("data-theme")
    }
  }

  toggleTheme() {
    this.preferences.darkMode = !this.preferences.darkMode
    this.savePreferences()
    this.applyTheme()
    this.showToast(this.preferences.darkMode ? "🌙 Tema scuro attivato" : "☀️ Tema chiaro attivato")
  }

  // 📱 Navigation Functions
  showView(viewId) {
    // Hide all views
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.remove("active-view")
    })

    // Show target view
    const targetView = document.getElementById(viewId)
    if (targetView) {
      targetView.classList.add("active-view")
      this.currentView = viewId
    }

    // Update navigation
    this.updateNavigation(viewId)
  }

  updateNavigation(viewId) {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active")
    })

    const activeNavItem = document.querySelector(`[data-view="${viewId}"]`)
    if (activeNavItem) {
      activeNavItem.classList.add("active")
    }
  }

  // 🔔 Notification Functions
  showToast(message, duration = 2000) {
    const toast = document.getElementById("saved-message")
    const messageSpan = document.getElementById("toast-message")

    if (toast && messageSpan) {
      messageSpan.textContent = message
      toast.style.display = "flex"

      setTimeout(() => {
        toast.style.display = "none"
      }, duration)
    }
  }

  showAndroidNotification(message) {
    if (!this.preferences.notificationsEnabled) return

    // Create notification element
    const notification = document.createElement("div")
    notification.className = "android-notification"
    notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-title">🎵 YALDI Music</div>
                <div class="notification-body">${message}</div>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `

    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 5000)
  }

  // 💾 History Functions
  saveToHistory(track) {
    let history = JSON.parse(localStorage.getItem("yaldi-history") || "[]")

    const historyItem = {
      track: track,
      album: this.currentAlbum.title,
      timestamp: Date.now(),
    }

    // Add to beginning and limit to 100 items
    history.unshift(historyItem)
    history = history.slice(0, 100)

    localStorage.setItem("yaldi-history", JSON.stringify(history))
  }

  clearHistory() {
    localStorage.removeItem("yaldi-history")
    this.showToast("🗑️ Cronologia cancellata")
  }

  // 📤 Export Functions
  exportUserData() {
    const userData = {
      preferences: this.preferences,
      history: JSON.parse(localStorage.getItem("yaldi-history") || "[]"),
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    }

    const dataStr = JSON.stringify(userData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = `yaldi-user-data-${Date.now()}.json`
    link.click()

    URL.revokeObjectURL(url)
    this.showToast("📤 Dati esportati con successo")
  }

  // 🧹 Cache Functions
  clearCache() {
    // Clear various caches
    localStorage.removeItem("yaldi-cache")
    localStorage.removeItem("yaldi-audio-cache")
    localStorage.removeItem("yaldi-image-cache")

    // Clear browser cache if possible
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          if (name.includes("yaldi")) {
            caches.delete(name)
          }
        })
      })
    }

    this.showToast("🗑️ Cache svuotata con successo")
  }

  // 🎯 Event Listeners Setup
  setupEventListeners() {
    // Navigation
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", () => {
        const viewId = item.dataset.view
        if (viewId) this.showView(viewId)
      })
    })

    // Player controls
    document.getElementById("play-btn")?.addEventListener("click", () => this.togglePlayPause())
    document.getElementById("play-btn-large")?.addEventListener("click", () => this.togglePlayPause())
    document.getElementById("next-btn")?.addEventListener("click", () => this.nextTrack())
    document.getElementById("next-btn-large")?.addEventListener("click", () => this.nextTrack())
    document.getElementById("prev-btn")?.addEventListener("click", () => this.previousTrack())
    document.getElementById("prev-btn-large")?.addEventListener("click", () => this.previousTrack())

    // Player bar click to expand
    document.getElementById("player-bar")?.addEventListener("click", () => {
      document.getElementById("player-container").classList.add("expanded")
    })

    // Player back button
    document.getElementById("player-back-btn")?.addEventListener("click", () => {
      document.getElementById("player-container").classList.remove("expanded")
    })

    // Album back button
    document.getElementById("album-back-btn")?.addEventListener("click", () => {
      this.showView("main-view")
    })

    // Theme toggle
    document.getElementById("theme-toggle")?.addEventListener("click", () => this.toggleTheme())

    // Cart
    document.getElementById("cart-toggle")?.addEventListener("click", () => this.showCart())

    // Size modal close
    document.getElementById("size-modal-close")?.addEventListener("click", () => this.hideSizeSelector())

    // Search toggle
    document.getElementById("search-toggle")?.addEventListener("click", () => this.toggleSearch())

    // Progress bar click
    document.getElementById("progress-container")?.addEventListener("click", (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      this.seekTo(percent * this.duration)
    })

    // Volume control
    document.getElementById("volume-slider")?.addEventListener("input", (e) => {
      this.volume = Number.parseFloat(e.target.value)
      if (this.audioElement) {
        this.audioElement.volume = this.volume
      }
    })

    // Shuffle and repeat
    document.getElementById("shuffle-btn")?.addEventListener("click", () => this.toggleShuffle())
    document.getElementById("loop-btn")?.addEventListener("click", () => this.toggleRepeat())

    // Volume button
    document.getElementById("volume-btn")?.addEventListener("click", () => this.toggleVolumeControl())

    // Lyrics button
    document.getElementById("lyrics-btn")?.addEventListener("click", () => this.toggleLyrics())

    // Category filters
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
        this.filterProducts(btn.dataset.category)
      })
    })

    // Profile tabs
    document.querySelectorAll(".profile-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabName = tab.dataset.tab
        this.showProfileTab(tabName)
      })
    })

    // Preferences button
    document.getElementById("preferences-btn")?.addEventListener("click", () => {
      this.showView("preferences-view")
    })

    // Preferences back button
    document.getElementById("preferences-back-btn")?.addEventListener("click", () => {
      this.showView("profile-view")
    })

    // Auth links
    document.getElementById("register-link")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.showView("register-view")
    })

    document.getElementById("login-link")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.showView("login-view")
    })

    // Auth back buttons
    document.getElementById("login-back-btn")?.addEventListener("click", () => {
      this.showView("profile-view")
    })

    document.getElementById("register-back-btn")?.addEventListener("click", () => {
      this.showView("profile-view")
    })

    // Logout
    document.getElementById("logout-btn")?.addEventListener("click", () => {
      this.showView("login-view")
      this.showToast("👋 Logout effettuato")
    })
  }

  // 🔍 Search Functions
  toggleSearch() {
    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      if (searchInput.style.display === "none") {
        searchInput.style.display = "block"
        searchInput.focus()
      } else {
        searchInput.style.display = "none"
        searchInput.value = ""
        this.filterProducts("all")
      }
    }
  }

  filterProducts(category) {
    const products = this.getProductsData()
    const filteredProducts = category === "all" ? products : products.filter((p) => p.category === category)

    this.displayProducts(filteredProducts)
  }

  displayProducts(products) {
    const productsGrid = document.getElementById("products-grid")
    if (!productsGrid) return

    productsGrid.innerHTML = products
      .map(
        (product) => `
            <div class="product-item" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
                <button class="add-to-cart-btn" onclick="app.addToCart(${product.id})">
                    🛒 Aggiungi al Carrello
                </button>
            </div>
        `,
      )
      .join("")
  }

  // 🛒 Cart Functions
  showCart() {
    const modal = document.getElementById("cart-modal")
    const content = document.getElementById("cart-content")

    if (this.cart.length === 0) {
      content.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🛒</div>
                    <h3>Il tuo carrello è vuoto</h3>
                    <p style="color: #666; margin-top: 10px;">Aggiungi alcuni prodotti per iniziare!</p>
                </div>
            `
    } else {
      content.innerHTML = `
                <div class="cart-items">
                    ${this.cart
                      .map(
                        (item) => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; border-radius: 8px;">
                            <div style="flex: 1; margin-left: 12px;">
                                <div style="font-weight: 500;">${item.name}</div>
                                ${item.size ? `<div style="color: #666; font-size: 0.9rem;">Taglia: ${item.size}</div>` : ""}
                                <div style="font-weight: 600; margin-top: 4px;">${item.price}</div>
                            </div>
                            <button onclick="app.removeFromCart(${item.id})" style="background: #ff3b30; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                    <button onclick="app.checkout()" style="width: 100%; padding: 15px; background: black; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        💳 Procedi al Checkout
                    </button>
                </div>
            `
    }

    modal.style.display = "flex"
  }

  removeFromCart(itemId) {
    this.cart = this.cart.filter((item) => item.id !== itemId)
    this.updateCartBadge()
    this.showCart() // Refresh cart display
    this.showToast("🗑️ Prodotto rimosso dal carrello")
  }

  checkout() {
    // Simulate checkout process
    this.showToast("💳 Checkout in corso...")

    setTimeout(() => {
      this.cart = []
      this.updateCartBadge()
      document.getElementById("cart-modal").style.display = "none"
      this.showToast("✅ Ordine completato con successo!")
    }, 2000)
  }

  // 🎵 Additional Player Functions
  seekTo(time) {
    if (this.audioElement) {
      this.audioElement.currentTime = time
    }
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle
    const btn = document.getElementById("shuffle-btn")
    if (btn) {
      btn.classList.toggle("active", this.isShuffle)
    }
    this.showToast(this.isShuffle ? "🔀 Riproduzione casuale attivata" : "🔀 Riproduzione casuale disattivata")
  }

  toggleRepeat() {
    this.isRepeat = !this.isRepeat
    const btn = document.getElementById("loop-btn")
    if (btn) {
      btn.classList.toggle("active", this.isRepeat)
    }
    this.showToast(this.isRepeat ? "🔁 Ripetizione attivata" : "🔁 Ripetizione disattivata")
  }

  toggleVolumeControl() {
    const volumeControl = document.getElementById("volume-control")
    if (volumeControl) {
      volumeControl.style.display = volumeControl.style.display === "none" ? "flex" : "none"
    }
  }

  toggleLyrics() {
    const lyricsContainer = document.getElementById("lyrics-container")
    if (lyricsContainer) {
      if (lyricsContainer.style.display === "none" || !lyricsContainer.style.display) {
        this.showLyrics()
      } else {
        lyricsContainer.style.display = "none"
      }
    }
  }

  showLyrics() {
    const lyricsContainer = document.getElementById("lyrics-container")
    if (!lyricsContainer || !this.currentTrack) return

    // Sample lyrics - in a real app, these would come from an API
    const lyrics = this.getLyricsForTrack(this.currentTrack.id)

    lyricsContainer.innerHTML = `
            <div style="padding: 20px; background: rgba(0,0,0,0.05); border-radius: 12px; margin-top: 20px;">
                <h3 style="margin-bottom: 15px;">📝 Testi - ${this.currentTrack.title}</h3>
                <div style="line-height: 1.6; white-space: pre-line;">${lyrics}</div>
            </div>
        `
    lyricsContainer.style.display = "block"
  }

  getLyricsForTrack(trackId) {
    // Sample lyrics data
    const lyricsData = {
      1: "🎵 The Garden of Aldi\nVersi del giardino di ALDI\nDove la musica cresce\nE i sogni fioriscono...",
      3: "🎵 New Aldi\nUn nuovo inizio\nUna nuova era\nYALDI forever...",
      6: "🎵 Aldien\nNel mondo di ALDI\nTutto è possibile\nLa musica è vita...",
    }

    return lyricsData[trackId] || "🎵 Testi non disponibili per questa traccia."
  }

  // 👤 Profile Functions
  showProfileTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll(".profile-tab-content").forEach((content) => {
      content.classList.remove("active")
    })

    // Remove active class from all tabs
    document.querySelectorAll(".profile-tab").forEach((tab) => {
      tab.classList.remove("active")
    })

    // Show selected tab content
    const targetContent = document.getElementById(`${tabName}-tab`)
    const targetTab = document.querySelector(`[data-tab="${tabName}"]`)

    if (targetContent) targetContent.classList.add("active")
    if (targetTab) targetTab.classList.add("active")
  }
}

// 🚀 Initialize App
let app

document.addEventListener("DOMContentLoaded", () => {
  app = new YaldiMusicApp()
  console.log("🎵 YALDI Music App inizializzata con successo!")
})

// 📱 Service Worker Registration (Optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("🔧 Service Worker registrato:", registration)
      })
      .catch((error) => {
        console.log("❌ Service Worker registration fallita:", error)
      })
  })
}

// 🎯 Global Functions for HTML onclick events
window.app = app
