document.addEventListener("DOMContentLoaded", () => {
  // --- DATA ---
  const albums = [
    {
      id: 1,
      title: "YALDHI",
      year: "2025",
      image: "images/yaldhi.png",
      available: true,
      tracks: [
        {
          id: 101,
          title: "THE GARDEN OF ALDI",
          artist: "YE",
          duration: "3:05",
          audioSrc: "YALDHI/01 THE GARDEN OF ALDI.mp3",
        },
        { id: 102, title: "THE ALDI STORM", artist: "YE", duration: "3:38", audioSrc: "YALDHI/02 THE ALDI STORM.m4a" },
        { id: 103, title: "NEW ALDI", artist: "YE", duration: "4:00", audioSrc: "YALDHI/03 NEW ALDI.mp3" },
        { id: 104, title: "80 ALDYIES", artist: "YE", duration: "2:48", audioSrc: "YALDHI/04 80 ALDYIES.m4a" },
        {
          id: 105,
          title: "ALDI IN THE SKY",
          artist: "YE",
          duration: "4:44",
          audioSrc: "YALDHI/05 ALDI IN THE SKY.mp3",
        },
        { id: 106, title: "ALDIEN", artist: "YE", duration: "2:04", audioSrc: "YALDHI/06 ALDIEN.mp3" },
        {
          id: 107,
          title: "BROTHERS OF ALDI",
          artist: "YE",
          duration: "4:15",
          audioSrc: "YALDHI/07 BROTHERS OF ALDI.mp3",
        },
        { id: 108, title: "FVCK GIANVOIT", artist: "YE", duration: "2:00", audioSrc: "YALDHI/08 FVCK GIANVOIT.mp3" },
      ],
    },
    {
      id: 2,
      title: "DONDA 2",
      year: "2022",
      image: "images/donda2.jpg",
      available: false,
      tracks: [
        {
          id: 201,
          title: "TRUE LOVE",
          artist: "YE, XXXTENTACION",
          duration: "3:15",
          audioSrc: "YALDHI/05 ALDI IN THE SKY.mp3",
        },
        {
          id: 202,
          title: "BROKEN ROAD",
          artist: "YE, DON TOLIVER",
          duration: "4:02",
          audioSrc: "YALDHI/07 BROTHERS OF ALDI.mp3",
        },
        { id: 203, title: "GET LOST", artist: "YE", duration: "2:47", audioSrc: "YALDHI/01 THE GARDEN OF ALDI.mp3" },
        { id: 204, title: "TOO EASY", artist: "YE", duration: "3:22", audioSrc: "YALDHI/06 ALDIEN.mp3" },
      ],
    },
    {
      id: 3,
      title: "BULDY",
      year: "2025",
      image: "images/buldy.jpg",
      available: false,
      tracks: [
        {
          id: 301,
          title: "FIRST TIME",
          artist: "YE, FUTURE",
          duration: "3:33",
          audioSrc: "YALDHI/08 FVCK GIANVOIT.mp3",
        },
      ],
    },
    {
      id: 4,
      title: "JL 2",
      year: "2025",
      image: "images/jl2.jpg",
      available: false,
      tracks: [
        {
          id: 401,
          title: "STARS",
          artist: "YE, YOUNG THUG",
          duration: "3:10",
          audioSrc: "YALDHI/01 THE GARDEN OF ALDI.mp3",
        },
        { id: 402, title: "VULTURES", artist: "YE, PLAYBOI CARTI", duration: "4:05", audioSrc: "YALDHI/06 ALDIEN.mp3" },
        {
          id: 403,
          title: "CARNIVAL",
          artist: "YE, RICH THE KID",
          duration: "3:50",
          audioSrc: "YALDHI/05 ALDI IN THE SKY.mp3",
        },
        {
          id: 404,
          title: "KEYS TO MY LIFE",
          artist: "YE",
          duration: "3:25",
          audioSrc: "YALDHI/07 BROTHERS OF ALDI.mp3",
        },
      ],
    },
  ]

  const products = [
    { id: "FM-104", name: "FREE MARINAIO TEE", image: "images/fm.jpg", price: "€30.00", category: "apparel" },
    { id: "YS-22", name: "YALDHI HOODIE", image: "images/hoodie.jpg", price: "€30.00", category: "apparel" },
    { id: "FM-104", name: "YALDHI BAG", image: "images/borsa.jpg", price: "€10.00", category: "accessories" },
    { id: "FM-104", name: "YALDHI BOTTLE", image: "images/borraccia.jpg", price: "€15.00", category: "accessories" },
    { id: "BL-05", name: "BULDY VINYL", image: "images/buldy.jpg", price: "€30.00", category: "music" },
    { id: "AY-01", name: "YALDHI CD", image: "images/yaldhicd.png", price: "€30.00", category: "music" },
  ]

  const events = [
    {
      title: "Y$Ø",
      subtitle: "YALDHI",
      desc: "LISTENING EXPERIENCE",
      location: "PERUGIA",
      venue: "DISCALDI ARENA",
      date: "1 4 25",
    },
    {
      title: "YE",
      subtitle: "DONDA 2",
      desc: "LISTENING EXPERIENCE",
      location: "PESARO",
      venue: "DISCALDI ARENA",
      date: "4 9 25",
    },
  ]

  // --- APPLICATION STATE ---
  let currentView = "main-view"
  let currentAlbum = null
  let currentTrack = null
  let isPlaying = false
  let userInteracted = false
  let isPlayerExpanded = false
  let isLoopActive = false
  let isShuffleActive = false
  let queue = []
  let originalQueue = []
  const isDragging = false

  const audioPlayer = document.getElementById("audio-player")

  // --- CACHE FREQUENTLY USED DOM ELEMENTS ---
  const playerContainer = document.getElementById("player-container")
  const playerBar = document.getElementById("player-bar")
  const expandedPlayer = document.getElementById("expanded-player")
  const collapsePlayerBtn = document.getElementById("collapse-player")
  const playBtn = document.getElementById("play-btn")
  const playBtnLarge = document.getElementById("play-btn-large")
  const prevBtn = document.getElementById("prev-btn")
  const prevBtnLarge = document.getElementById("prev-btn-large")
  const nextBtn = document.getElementById("next-btn")
  const nextBtnLarge = document.getElementById("next-btn-large")
  const loopBtn = document.getElementById("loop-btn")
  const queueBtn = document.getElementById("queue-btn")
  const shuffleBtn = document.getElementById("shuffle-btn")
  const progressContainer = document.getElementById("progress-container")
  const progressBar = document.getElementById("progress-bar")
  const currentTimeDisplay = document.getElementById("current-time")
  const totalTimeDisplay = document.getElementById("total-time")
  const queueContainer = document.getElementById("queue-container")
  const navItems = document.querySelectorAll(".nav-item")
  const appContainers = document.querySelectorAll(".app-container")

  // --- INITIALIZATION ---
  function init() {
    if (!audioPlayer) {
      console.error("Critical Error: Main audio player element (#audio-player) not found!")
      return
    }

    renderAlbumGrid()
    renderProducts()
    renderEvents()
    setupNavigation()
    setupAudioPlayer()
    setupExpandablePlayer()
    setupProgressBar()
    setupCategoryFilters()
    setupUserInteractionTracking()
    setupAdditionalControls()

    console.log("App initialized.")
  }

  // Track user interaction to enable audio
  function setupUserInteractionTracking() {
    const interactionEvents = ["click", "touchstart", "keydown"]

    function handleFirstInteraction() {
      userInteracted = true
      console.log("User has interacted with the page. Audio playback should now be allowed.")

      // Remove event listeners once interaction is detected
      interactionEvents.forEach((event) => {
        document.removeEventListener(event, handleFirstInteraction)
      })
    }

    interactionEvents.forEach((event) => {
      document.addEventListener(event, handleFirstInteraction)
    })
  }

  // --- EXPANDABLE PLAYER ---
  function setupExpandablePlayer() {
    playerBar.addEventListener("click", togglePlayerExpansion)
    collapsePlayerBtn.addEventListener("click", togglePlayerExpansion)
  }

  function togglePlayerExpansion(e) {
    // Don't toggle if clicking on controls
    if (
      e.target.closest(".controls") ||
      e.target.closest(".play-btn") ||
      e.target.closest(".prev-btn") ||
      e.target.closest(".next-btn")
    ) {
      return
    }

    isPlayerExpanded = !isPlayerExpanded
    playerContainer.classList.toggle("expanded", isPlayerExpanded)
  }

  // --- PROGRESS BAR ---
  function setupProgressBar() {
    // Update progress bar as audio plays
    audioPlayer.addEventListener("timeupdate", updateProgressBar)

    // Allow seeking by clicking on progress bar
    progressContainer.addEventListener("click", seek)
  }

  function updateProgressBar() {
    if (!audioPlayer.duration) return

    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100
    progressBar.style.width = `${percent}%`

    // Update time displays
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime)
    totalTimeDisplay.textContent = formatTime(audioPlayer.duration)
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  function seek(e) {
    const progressRect = progressContainer.getBoundingClientRect()
    const percent = (e.clientX - progressRect.left) / progressRect.width

    if (audioPlayer.duration) {
      audioPlayer.currentTime = percent * audioPlayer.duration
    }
  }

  // --- ADDITIONAL CONTROLS ---
  function setupAdditionalControls() {
    loopBtn.addEventListener("click", toggleLoop)
    shuffleBtn.addEventListener("click", toggleShuffle)
    queueBtn.addEventListener("click", () => {
      queueBtn.classList.add("active")
      loopBtn.classList.remove("active")
      shuffleBtn.classList.remove("active")
    })
  }

  function toggleLoop() {
    isLoopActive = !isLoopActive
    audioPlayer.loop = isLoopActive
    loopBtn.classList.toggle("active", isLoopActive)
  }

  function toggleShuffle() {
    isShuffleActive = !isShuffleActive
    shuffleBtn.classList.toggle("active", isShuffleActive)

    if (isShuffleActive && queue.length > 1) {
      // Save original queue if not already saved
      if (originalQueue.length === 0) {
        originalQueue = [...queue]
      }

      // Shuffle the queue (except the currently playing track)
      const currentTrackId = currentTrack ? currentTrack.id : null
      const currentIndex = queue.findIndex((track) => track.id === currentTrackId)

      let shuffledQueue = []

      // Keep current track at its position if it exists
      if (currentIndex !== -1) {
        shuffledQueue.push(queue[currentIndex])
      }

      // Get remaining tracks and shuffle them
      const remainingTracks = queue.filter((_, i) => i !== currentIndex)
      shuffleArray(remainingTracks)

      // Add shuffled tracks to the queue
      shuffledQueue = shuffledQueue.concat(remainingTracks)
      queue = shuffledQueue

      // Update queue display
      updateQueueDisplay()
    } else if (!isShuffleActive && originalQueue.length > 0) {
      // Restore original queue order
      queue = [...originalQueue]
      originalQueue = []
      updateQueueDisplay()
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // --- NAVIGATION BETWEEN VIEWS ---
  function setupNavigation() {
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const targetViewId = this.getAttribute("data-view")
        if (!targetViewId || targetViewId === currentView) return

        switchView(targetViewId)

        // Update active state in all nav bars
        navItems.forEach((navItem) => {
          navItem.classList.toggle("active", navItem.getAttribute("data-view") === targetViewId)
        })
      })
    })
  }

  function switchView(viewId) {
    console.log("Switching to view:", viewId)
    currentView = viewId

    // Hide all views
    appContainers.forEach((container) => {
      container.classList.add("hidden")
    })

    // Show target view
    const targetView = document.getElementById(viewId)
    if (targetView) {
      targetView.classList.remove("hidden")
    } else {
      console.error("Target view not found:", viewId)
    }
  }

  // --- CONTENT RENDERING ---
  function renderAlbumGrid() {
    const albumGrid = document.querySelector("#main-view .album-grid")
    if (!albumGrid) return

    albumGrid.innerHTML = ""

    albums.forEach((album) => {
      const albumElement = document.createElement("div")
      albumElement.className = `album-item`

      let imageType = "image/jpeg"
      if (album.image.endsWith(".png")) imageType = "image/png"

      // Mostra l'overlay su tutti gli album tranne YALDHI
      const showOverlay = !album.available

      albumElement.innerHTML = `
        <div class="album-image-container">
          <picture>
            <source srcset="${album.image}" type="${imageType}">
            <img src="${album.image}" alt="${album.title} cover">
          </picture>
          ${showOverlay ? '<div class="album-overlay"><span>COMING SOON</span></div>' : ""}
        </div>
        <div class="album-title">${album.title}</div>
        <div class="album-year">${album.year}</div>
      `

      albumElement.addEventListener("click", () => {
        if (album.available) {
          showAlbumDetail(album)
        } else {
          console.log("Album not available yet")
        }
      })

      albumGrid.appendChild(albumElement)
    })
  }

  function showAlbumDetail(album) {
    // Verifica che l'album sia disponibile prima di mostrare i dettagli
    if (!album.available) {
      console.log("Album non disponibile")
      return
    }

    currentAlbum = album
    const detailView = document.getElementById("album-detail-view")
    if (!detailView) {
      console.error("Album detail view not found")
      return
    }

    // Update album info
    detailView.querySelector(".album-title").textContent = album.title
    detailView.querySelector(".album-title-large").textContent = album.title
    detailView.querySelector(".album-year").textContent = album.year
    detailView.querySelector(".album-tracks-count").textContent = `${album.tracks.length} brani`

    const albumCoverPicture = detailView.querySelector(".album-cover-picture")
    const albumSource = albumCoverPicture.querySelector(".album-source")
    const albumCover = albumCoverPicture.querySelector(".album-cover")

    let imageType = "image/jpeg"
    if (album.image.endsWith(".png")) imageType = "image/png"

    albumSource.srcset = album.image
    albumSource.type = imageType
    albumCover.src = album.image
    albumCover.alt = `${album.title} album cover`

    // Render tracks list
    const tracksList = detailView.querySelector(".tracks-list")
    tracksList.innerHTML = ""

    album.tracks.forEach((track) => {
      const trackElement = document.createElement("div")
      trackElement.className = "track-item"
      trackElement.dataset.trackId = track.id

      trackElement.innerHTML = `
        <div class="track-left">
          <i class="fas fa-music track-icon"></i>
          <span class="track-name">${track.title}</span>
        </div>
        <div class="track-duration">${track.duration}</div>
      `

      trackElement.addEventListener("click", () => {
        selectTrack(track, album)
      })

      tracksList.appendChild(trackElement)
    })

    // Update track list UI (highlight current track if it belongs to this album)
    updateTrackListUI(currentTrack && currentTrack.albumId === album.id ? currentTrack.id : null)

    // Show album detail view
    switchView("album-detail-view")

    // Setup back button
    const backButton = detailView.querySelector(".back-btn")
    if (backButton) {
      backButton.addEventListener("click", () => {
        switchView("main-view")

        // Update nav bar
        navItems.forEach((navItem) => {
          navItem.classList.toggle("active", navItem.getAttribute("data-view") === "main-view")
        })
      })
    }
  }
   function togglePlayerExpansion(e) {
    // Don't toggle if clicking on controls
    if (
      e.target.closest(".controls") ||
      e.target.closest(".play-btn") ||
      e.target.closest(".prev-btn") ||
      e.target.closest(".next-btn")
    ) {
      return
    }

    isPlayerExpanded = !isPlayerExpanded

    playerContainer.classList.toggle("expanded", isPlayerExpanded)

    // Aggiungi/rimuovi la classe al body
    if (isPlayerExpanded) {
        document.body.classList.add('player-expanded');
    } else {
        document.body.classList.remove('player-expanded');
    }
  }
  

  function renderProducts(category = "all") {
    const productsGrid = document.querySelector("#stores-view .products-grid")
    if (!productsGrid) return

    productsGrid.innerHTML = ""

    const filteredProducts = category === "all" ? products : products.filter((p) => p.category === category)

    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = "<p>Nessun prodotto trovato.</p>"
      return
    }

    filteredProducts.forEach((product) => {
      const productElement = document.createElement("div")
      productElement.className = "product-item"

      productElement.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.name}">
        <div class="product-id">${product.id}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}</div>
      `

      productsGrid.appendChild(productElement)
    })
  }

  function renderEvents() {
    const eventsGrid = document.querySelector("#events-view .events-grid")
    if (!eventsGrid) return

    eventsGrid.innerHTML = ""

    if (events.length === 0) {
      eventsGrid.innerHTML = "<p>Nessun evento.</p>"
      return
    }

    events.forEach((event) => {
      const eventElement = document.createElement("div")
      eventElement.className = "event-card"

      eventElement.innerHTML = `
        <div class="event-content">
          <div class="event-title">${event.title}</div>
          <div class="event-subtitle">${event.subtitle}</div>
          <div class="event-desc">${event.desc}</div>
          <div class="event-location">${event.location}</div>
          <div class="event-venue">${event.venue}</div>
          <div class="event-date">${event.date}</div>
        </div>
      `

      eventsGrid.appendChild(eventElement)
    })
  }

  // --- AUDIO PLAYER LOGIC ---
  function setupAudioPlayer() {
    // Set up event listeners for player controls
    playBtn.addEventListener("click", togglePlayPause)
    playBtnLarge.addEventListener("click", togglePlayPause)
    prevBtn.addEventListener("click", playPrevTrack)
    prevBtnLarge.addEventListener("click", playPrevTrack)
    nextBtn.addEventListener("click", playNextTrack)
    nextBtnLarge.addEventListener("click", playNextTrack)

    // Set up audio element event listeners
    audioPlayer.addEventListener("ended", handleTrackEnd)
    audioPlayer.addEventListener("play", handlePlayEvent)
    audioPlayer.addEventListener("pause", handlePauseEvent)
    audioPlayer.addEventListener("error", handleErrorEvent)
    audioPlayer.addEventListener("loadedmetadata", () => {
      totalTimeDisplay.textContent = formatTime(audioPlayer.duration)
    })
  }

  function handlePlayEvent() {
    console.log("Audio player event: play")
    isPlaying = true
    updatePlayPauseButton()
    updateTrackIcon(true)
  }

  function handlePauseEvent() {
    console.log("Audio player event: pause")
    isPlaying = false
    updatePlayPauseButton()
    updateTrackIcon(false)
  }

  function handleTrackEnd() {
    console.log("Audio player event: ended")

    if (isLoopActive) {
      // If loop is active, just restart the current track
      audioPlayer.currentTime = 0
      audioPlayer.play().catch((e) => console.error("Error looping track:", e))
    } else {
      // Otherwise play next track
      playNextTrack()
    }
  }

  function handleErrorEvent(e) {
    console.error("Audio Player Error:", e, audioPlayer.error)
    isPlaying = false
    updatePlayPauseButton()
    updateTrackIcon(false)

    // Reset player bar UI
    document.getElementById("player-artwork").src = "placeholder.svg"
    document.getElementById("player-track-title").textContent = "Errore Audio"
    document.getElementById("player-track-album").textContent = ""
  }

  // This function selects a track but doesn't automatically play it
  function selectTrack(track, album) {
    if (!track || !album) {
      console.error("selectTrack called without valid track or album.");
      return;
    }

    // Handle click on same track (toggle play/pause)
    if (currentTrack && currentTrack.id === track.id) {
      togglePlayPause();
      return;
    }

    // Change track
    console.log(`Selected track (ID: ${track.id}): ${track.title}`);

    // Save reference to current track and album
    currentTrack = { ...track, albumId: album.id };
    currentAlbum = album;

    // Verify audio path
    console.log(`Setting audio source to: ${track.audioSrc}`);

    if (!track.audioSrc || typeof track.audioSrc !== "string" || track.audioSrc.trim() === "") {
      console.error(`Error: Invalid audio path for track "${track.title}" (ID: ${track.id}). Received:`, track.audioSrc);
      alert(`Error: Missing or invalid audio path for "${track.title}". Check the data in the 'albums' array.`);
      return;
    }

    // Set the audio source
    audioPlayer.src = track.audioSrc;
    audioPlayer.load();

    // Update player bar UI
    updatePlayerUI(track, album);

    // Update track list UI if in album detail view
    if (currentView === "album-detail-view" && currentAlbum.id === album.id) {
      updateTrackListUI(track.id);
    } else if (currentView === "album-detail-view") {
      updateTrackListUI(null);
    }

    // Build queue from current album
    buildQueue(track, album);

    // **Aggiungi questa riga per avviare la riproduzione automatica**
    audioPlayer.play().catch((error) => {
      console.error("Error playing audio after track selection:", error);
      if (error.name === "NotAllowedError") {
        console.warn("Autoplay was prevented. User interaction is required.");
        // Puoi anche mostrare un messaggio all'utente qui se lo desideri.
      }
    });
    isPlaying = true; // Aggiorna lo stato di riproduzione
    updatePlayPauseButton();
  }

  function updatePlayerUI(track, album) {
    // Update mini player
    const playerArtwork = document.getElementById("player-artwork")
    const playerTrackTitle = document.getElementById("player-track-title")
    const playerTrackAlbum = document.getElementById("player-track-album")
    const expandedArtwork = document.getElementById("expanded-artwork")
    const expandedTrackTitle = document.getElementById("expanded-track-title")
    const expandedTrackArtist = document.getElementById("expanded-track-artist")
    const expandedAlbumTitle = document.getElementById("expanded-album-title")

    // Update mini player
    playerArtwork.src = album.image || "placeholder.svg"
    playerArtwork.alt = `Now playing: ${track.title}`
    playerTrackTitle.textContent = track.title
    playerTrackAlbum.textContent = album.title

    // Update expanded player
    expandedArtwork.src = album.image || "placeholder.svg"
    expandedArtwork.alt = `${album.title} cover`
    expandedTrackTitle.textContent = track.title
    expandedTrackArtist.textContent = track.artist || album.title
    expandedAlbumTitle.textContent = album.title

    // Reset progress bar
    progressBar.style.width = "0%"
    currentTimeDisplay.textContent = "0:00"
    totalTimeDisplay.textContent = track.duration || "0:00"
  }

  function buildQueue(currentTrack, album) {
    // Start with all tracks from the album
    queue = [...album.tracks]

    // If shuffle is active, shuffle the queue but keep current track first
    if (isShuffleActive) {
      const currentIndex = queue.findIndex((t) => t.id === currentTrack.id)
      if (currentIndex !== -1) {
        // Remove current track
        const [current] = queue.splice(currentIndex, 1)

        // Shuffle remaining tracks
        shuffleArray(queue)

        // Put current track back at the beginning
        queue.unshift(current)
      }
    }

    // Save original queue for when shuffle is toggled off
    originalQueue = [...album.tracks]

    // Update queue display
    updateQueueDisplay()
  }

  function updateQueueDisplay() {
    queueContainer.innerHTML = ""

    // Skip the first track if it's the current track
    const queueToDisplay = currentTrack ? queue.filter((track) => track.id !== currentTrack.id) : queue

    queueToDisplay.forEach((track) => {
      const queueItem = document.createElement("div")
      queueItem.className = "queue-item"
      queueItem.dataset.trackId = track.id

      queueItem.innerHTML = `
        <div class="queue-item-info">
          <div class="queue-item-title">${track.title}</div>
          <div class="queue-item-artist">${track.artist || currentAlbum.title}</div>
        </div>
      `

      queueItem.addEventListener("click", () => {
        selectTrack(track, currentAlbum)
        if (isPlaying) {
          audioPlayer.play().catch((e) => console.error("Error playing track from queue:", e))
        }
      })

      queueContainer.appendChild(queueItem)
    })
  }

  // --- UI UPDATES ---
  function updateTrackListUI(activeTrackId) {
    if (currentView !== "album-detail-view" || !currentAlbum) return

    const tracksList = document.querySelector("#album-detail-view .tracks-list")
    if (!tracksList) return

    tracksList.querySelectorAll(".track-item").forEach((item) => {
      const icon = item.querySelector(".track-icon")
      const isCurrentTrack = String(item.dataset.trackId) === String(activeTrackId)

      item.classList.toggle("active", isCurrentTrack)

      if (icon) {
        icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up", "active")

        if (isCurrentTrack) {
          icon.classList.add("active")
          icon.classList.add(isPlaying ? "fa-volume-up" : "fa-pause")
        } else {
          icon.classList.add("fa-music")
        }
      }
    })
  }

  function updateTrackIcon(isPlayingNow) {
    if (currentView === "album-detail-view" && currentTrack) {
      const activeTrackItem = document.querySelector(
        `#album-detail-view .track-item[data-track-id="${currentTrack.id}"]`,
      )

      if (activeTrackItem) {
        const icon = activeTrackItem.querySelector(".track-icon")

        if (icon && activeTrackItem.classList.contains("active")) {
          icon.classList.remove("fa-music", "fa-play", "fa-pause", "fa-volume-up")
          icon.classList.add(isPlayingNow ? "fa-volume-up" : "fa-pause")
        }
      }
    }
  }

  function updatePlayPauseButton() {
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>'
    playBtnLarge.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>'
  }

  // --- PLAYER CONTROLS ---
  function togglePlayPause() {
    console.log("Toggle Play/Pause button clicked.")

    // If no track selected, try to select first track of first album
    if (!currentTrack) {
      console.log("No current track, attempting to select first track overall.")

      // Trova l'album YALDHI
      const yaldhiAlbum = albums.find((album) => album.title === "YALDHI")

      if (yaldhiAlbum && yaldhiAlbum.tracks.length > 0) {
        selectTrack(yaldhiAlbum.tracks[0], yaldhiAlbum)
      } else {
        console.warn("No tracks available in albums for playback.")
        alert("Nessuna traccia disponibile per la riproduzione.")
      }
      return
    }

    // Toggle play/pause for current track
    if (isPlaying) {
      audioPlayer.pause()
    } else {
      // Try to play with proper error handling
      try {
        const playPromise = audioPlayer.play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error playing audio:", error)

            if (error.name === "NotAllowedError") {
              console.warn("Playback blocked by browser autoplay policy.")

              // Show a user-friendly message
              const message = document.createElement("div")
              message.className = "autoplay-message"
              message.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; right: 0; background: rgba(0,0,0,0.8); color: white; 
                            padding: 15px; text-align: center; z-index: 9999;">
                  Per riprodurre l'audio, interagisci con la pagina e premi nuovamente play.
                  <button style="margin-left: 10px; padding: 5px 10px; background: white; color: black; border: none; 
                                border-radius: 3px; cursor: pointer;" id="dismiss-message">OK</button>
                </div>
              `

              document.body.appendChild(message)

              document.getElementById("dismiss-message").addEventListener("click", () => {
                document.body.removeChild(message)
              })
            }
          })
        }
      } catch (e) {
        console.error("Exception during play attempt:", e)
      }
    }
  }

  function playNextTrack() {
    console.log("Next track requested.")

    if (!currentTrack || !currentAlbum || queue.length === 0) {
      console.log("No current track, album, or queue found to go to next.")
      return
    }

    // Find current track in queue
    const currentIndex = queue.findIndex((t) => t.id === currentTrack.id)

    if (currentIndex !== -1 && currentIndex < queue.length - 1) {
      // There is a next track in the queue
      console.log("Selecting next track in queue.")
      selectTrack(queue[currentIndex + 1], currentAlbum)

      // If we were playing, try to continue playing
      if (isPlaying) {
        try {
          audioPlayer.play().catch((e) => console.log("Could not auto-play next track:", e))
        } catch (e) {
          console.error("Exception during next track play:", e)
        }
      }
    } else {
      console.log("Last track of queue reached.")

      // End of queue: Pause
      if (!audioPlayer.paused) audioPlayer.pause()
    }
  }

  function playPrevTrack() {
    console.log("Previous track requested.")

    if (!currentTrack || !currentAlbum || queue.length === 0) {
      console.log("No current track, album, or queue found to go to previous.")
      return
    }

    // If current time is more than 3 seconds, just restart the current track
    if (audioPlayer.currentTime > 3) {
      console.log("Rewinding current track.")
      audioPlayer.currentTime = 0
      return
    }

    // Find current track in queue
    const currentIndex = queue.findIndex((t) => t.id === currentTrack.id)

    if (currentIndex > 0) {
      // There is a previous track in the queue
      console.log("Selecting previous track in queue.")
      selectTrack(queue[currentIndex - 1], currentAlbum)

      // If we were playing, try to continue playing
      if (isPlaying) {
        try {
          audioPlayer.play().catch((e) => console.log("Could not auto-play previous track:", e))
        } catch (e) {
          console.error("Exception during previous track play:", e)
        }
      }
    } else {
      console.log("First track of queue reached.")
      // Just restart the current track
      audioPlayer.currentTime = 0
    }
  }

  // --- STORE & EVENTS ---
  function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll("#stores-view .category-btn")

    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-category")

        categoryButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")

        renderProducts(category)
      })
    })
  }

  if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Permesso notifiche concesso.');
      // Ora puoi creare e mostrare le notifiche
    } else {
      console.log('Permesso notifiche negato o ignorato.');
    }
  });
}
  if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    artist: track.artist || album.title,
    album: album.title,
    artwork: [
      { src: album.image,   sizes: '96x96',   type: 'image/png' },
      { src: album.image,   sizes: '128x128', type: 'image/png' },
      { src: album.image,   sizes: '192x192', type: 'image/png' },
      { src: album.image,   sizes: '256x256', type: 'image/png' },
      { src: album.image,   sizes: '384x384', type: 'image/png' },
      { src: album.image,   sizes: '512x512', type: 'image/png' }
    ]
  });

  // Gestire le azioni multimediali (click sui controlli di sistema/notifica)
  navigator.mediaSession.setActionHandler('play', () => { /* Gestisci l'evento play */ });
  navigator.mediaSession.setActionHandler('pause', () => { /* Gestisci l'evento pause */ });
  navigator.mediaSession.setActionHandler('previoustrack', () => { /* Gestisci l'evento traccia precedente */ });
  navigator.mediaSession.setActionHandler('nexttrack', () => { /* Gestisci l'evento traccia successiva */ });
  // Puoi aggiungere altri gestori come 'seekforward', 'seekbackward', ecc.
}

  function showTrackNotification(track, album) {
  if ('Notification' in window && Notification.permission === 'granted') {
    const notificationOptions = {
      body: `${track.artist || album.title} - ${album.title}`,
      icon: album.image, // L'artwork come icona della notifica
      silent: true, // Di solito le notifiche musicali non emettono suono
      // Tag opzionale per aggiornare una notifica esistente
      tag: 'music-player-notification'
    };

    try {
        const notification = new Notification(track.title, notificationOptions);

        // (Opzionale) Gestire il click sulla notifica
        notification.onclick = function(event) {
            event.preventDefault(); // Impedisce al browser di mettere a fuoco la tab
            // Puoi far qualcosa quando l'utente clicca sulla notifica, es. aprire l'app
            console.log('Notifica cliccata');
        };

    } catch (error) {
        console.error("Errore nella creazione della notifica:", error);
    }
  }
}
  
  // --- START APPLICATION ---
  init()
})
