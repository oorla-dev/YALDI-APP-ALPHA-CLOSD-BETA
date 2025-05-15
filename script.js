document.addEventListener('DOMContentLoaded', function() {
    // Data
    const albums = [
        { id: 'album1', title: 'YALDI', year: '2023', cover: '/placeholder.svg?height=300&width=300', tracks: [
            { id: 'track1', name: 'INTRO', duration: '1:30', file: null },
            { id: 'track2', name: 'YALDI', duration: '3:45', file: null },
            { id: 'track3', name: 'SNDLS', duration: '2:55', file: null },
            { id: 'track4', name: 'OUTRO', duration: '2:10', file: null }
        ]},
        { id: 'album2', title: 'YALDI 2', year: '2024', cover: '/placeholder.svg?height=300&width=300', tracks: [
            { id: 'track5', name: 'INTRO 2', duration: '1:20', file: null },
            { id: 'track6', name: 'YALDI 2', duration: '3:30', file: null },
            { id: 'track7', name: 'SNDLS 2', duration: '2:45', file: null },
            { id: 'track8', name: 'OUTRO 2', duration: '2:00', file: null }
        ]}
    ];

    const products = [
        { id: 'YLD001', name: 'YALDI T-SHIRT', price: '€29.99', category: 'apparel', image: '/placeholder.svg?height=300&width=300' },
        { id: 'YLD002', name: 'SNDLS HOODIE', price: '€59.99', category: 'apparel', image: '/placeholder.svg?height=300&width=300' },
        { id: 'YLD003', name: 'YALDI VINYL', price: '€24.99', category: 'music', image: '/placeholder.svg?height=300&width=300' },
        { id: 'YLD004', name: 'YALDI CD', price: '€14.99', category: 'music', image: '/placeholder.svg?height=300&width=300' },
        { id: 'YLD005', name: 'YALDI CAP', price: '€19.99', category: 'apparel', image: '/placeholder.svg?height=300&width=300' },
        { id: 'YLD006', name: 'TOUR POSTER', price: '€9.99', category: 'music', image: '/placeholder.svg?height=300&width=300' }
    ];

    const events = [
        { id: 'event1', title: 'YALDI TOUR 2023', subtitle: 'WORLD TOUR', description: 'Join us for an unforgettable night of music and energy.', location: 'Milan, Italy', venue: 'San Siro Stadium', date: 'June 15, 2023' },
        { id: 'event2', title: 'SUMMER FESTIVAL', subtitle: 'FEATURING YALDI', description: 'The biggest summer festival with the hottest artists.', location: 'Rome, Italy', venue: 'Circus Maximus', date: 'July 22, 2023' },
        { id: 'event3', title: 'CLUB NIGHT', subtitle: 'YALDI DJ SET', description: 'Experience YALDI\'s exclusive DJ set in an intimate setting.', location: 'Florence, Italy', venue: 'Club Tenax', date: 'August 5, 2023' }
    ];

    const messages = [
        { id: 'msg1', text: 'Hey, have you heard the new YALDI album?', from: 'other', time: '10:30 AM' },
        { id: 'msg2', text: 'Yes! It\'s amazing! I can\'t stop listening to it.', from: 'y', time: '10:32 AM' },
        { id: 'msg3', text: 'Which track is your favorite?', from: 'other', time: '10:33 AM' },
        { id: 'msg4', text: 'Definitely SNDLS. The beat is incredible.', from: 'y', time: '10:35 AM' },
        { id: 'msg5', text: 'Are you going to the tour?', from: 'other', time: '10:36 AM' },
        { id: 'msg6', text: 'Already got my tickets for Milan! Can\'t wait!', from: 'y', time: '10:38 AM' }
    ];

    // Lyrics data
    const lyrics = {
        'track2': [
            "This is the first line of YALDI lyrics",
            "Second line of the song",
            "Third line with more lyrics",
            "Fourth line of the YALDI song",
            "Fifth line continues the lyrics",
            "Sixth line of the song",
            "Seventh line with more words",
            "Eighth line of the YALDI track",
            "Ninth line of lyrics here",
            "Tenth and final line of the song"
        ],
        'track3': [
            "First line of SNDLS lyrics",
            "Second line of this track",
            "Third line continues the song",
            "Fourth line of SNDLS lyrics",
            "Fifth line of this popular track",
            "Sixth line with more words",
            "Seventh line of the song",
            "Eighth line continues the lyrics",
            "Ninth line of SNDLS",
            "Tenth and final line of this track"
        ]
    };

    // State
    let currentView = 'home-view';
    let currentAlbum = null;
    let currentTrack = null;
    let isPlaying = false;
    let isPlayerExpanded = false;
    let isLyricsView = false;
    let currentCategory = 'all';
    let cartItems = [];
    let selectedProduct = null;
    let currentCheckoutStep = 'shipping';
    let shippingInfo = {
        fullName: '',
        address: '',
        city: '',
        zipCode: '',
        country: '',
        email: '',
        phone: ''
    };
    let paymentMethod = 'credit-card';
    let cardInfo = {
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
    };
    let isProcessing = false;

    // DOM Elements
    const mainContent = document.getElementById('main-content');
    const navItems = document.querySelectorAll('.nav-item');
    const playerContainer = document.getElementById('player-container');
    const playerBar = document.getElementById('player-bar');
    const expandedPlayer = document.getElementById('expanded-player');
    const collapsePlayerBtn = document.getElementById('collapse-player-btn');
    const miniPlayBtn = document.getElementById('mini-play-btn');
    const miniNextBtn = document.getElementById('mini-next-btn');
    const playBtnLarge = document.getElementById('play-btn-large');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const loopBtn = document.getElementById('loop-btn');
    const playerBtn = document.getElementById('player-btn');
    const lyricsBtn = document.getElementById('lyrics-btn');
    const lyricsContainer = document.getElementById('lyrics-container');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const sizeModal = document.getElementById('size-modal');
    const closeSizeBtn = document.getElementById('close-size-btn');
    const sizeProductName = document.getElementById('size-product-name');
    const sizeBtns = document.querySelectorAll('.size-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.getElementById('close-checkout-btn');
    const checkoutContent = document.getElementById('checkout-content');
    const shippingStepIndicator = document.getElementById('shipping-step-indicator');
    const paymentStepIndicator = document.getElementById('payment-step-indicator');
    const reviewStepIndicator = document.getElementById('review-step-indicator');
    const checkoutHeader = document.getElementById('checkout-header');
    const checkoutProgress = document.getElementById('checkout-progress');

    // Initialize
    renderView(currentView);

    // Event Listeners
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            renderView(view);
        });
    });

    playerBar.addEventListener('click', function() {
        expandPlayer();
    });

    collapsePlayerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        collapsePlayer();
    });

    miniPlayBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePlay();
    });

    miniNextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        playNextTrack();
    });

    playBtnLarge.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', playPrevTrack);
    nextBtn.addEventListener('click', playNextTrack);
    shuffleBtn.addEventListener('click', toggleShuffle);
    loopBtn.addEventListener('click', toggleLoop);

    playerBtn.addEventListener('click', function() {
        showPlayerView();
    });

    lyricsBtn.addEventListener('click', function() {
        showLyricsView();
    });

    progressContainer.addEventListener('click', function(e) {
        const percent = (e.offsetX / this.offsetWidth);
        // In a real app, this would seek the audio
        progressBar.style.width = `${percent * 100}%`;
        updateTimeDisplay(percent * 100);
    });

    closeCartBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    closeSizeBtn.addEventListener('click', function() {
        sizeModal.style.display = 'none';
    });

    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            if (selectedProduct) {
                addToCart(selectedProduct, size);
                sizeModal.style.display = 'none';
            }
        });
    });

    closeCheckoutBtn.addEventListener('click', function() {
        checkoutModal.style.display = 'none';
    });

    // View Rendering Functions
    function renderView(view) {
        currentView = view;
        
        // Update active nav item
        navItems.forEach(item => {
            if (item.getAttribute('data-view') === view) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Render the appropriate view
        switch(view) {
            case 'home-view':
                renderHomeView();
                break;
            case 'stores-view':
                renderStoresView();
                break;
            case 'events-view':
                renderEventsView();
                break;
            case 'hql-view':
                renderHQLView();
                break;
            default:
                renderHomeView();
        }
    }

    function renderHomeView() {
        let html = `
            <div class="album-grid">
                ${albums.map(album => `
                    <div class="album-item" data-album-id="${album.id}">
                        <img src="${album.cover}" alt="${album.title}">
                        <div class="album-title">${album.title}</div>
                        <div class="album-year">${album.year}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        mainContent.innerHTML = html;

        // Add event listeners to album items
        document.querySelectorAll('.album-item').forEach(item => {
            item.addEventListener('click', function() {
                const albumId = this.getAttribute('data-album-id');
                const album = albums.find(a => a.id === albumId);
                renderAlbumDetail(album);
            });
        });
    }

    function renderAlbumDetail(album) {
        currentAlbum = album;
        
        let html = `
            <div class="album-header">
                <button class="back-btn"><i class="fas fa-arrow-left"></i></button>
                <div class="header-item">ALBUM</div>
            </div>
            <div class="album-info">
                <img class="album-cover" src="${album.cover}" alt="${album.title}">
                <div class="album-details">
                    <div class="album-title-large">${album.title}</div>
                    <div class="album-tracks-count">${album.tracks.length} TRACKS</div>
                </div>
            </div>
            <div class="tracks-list">
                ${album.tracks.map(track => `
                    <div class="track-item" data-track-id="${track.id}">
                        <div class="track-left">
                            <div class="track-icon ${currentTrack && currentTrack.id === track.id ? 'active' : ''}">
                                <i class="fas ${currentTrack && currentTrack.id === track.id && isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                            </div>
                            <div class="track-name">${track.name}</div>
                        </div>
                        <div class="track-duration">${track.duration}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        mainContent.innerHTML = html;

        // Add event listener to back button
        document.querySelector('.back-btn').addEventListener('click', function() {
            renderHomeView();
        });

        // Add event listeners to track items
        document.querySelectorAll('.track-item').forEach(item => {
            item.addEventListener('click', function() {
                const trackId = this.getAttribute('data-track-id');
                const track = album.tracks.find(t => t.id === trackId);
                playTrack(track, album);
            });
        });
    }

    function renderStoresView() {
        let html = `
            <div class="store-header">
                <div class="store-title">YALDI.IT</div>
                <div class="store-icons">
                    <div class="search-container">
                        <input type="text" class="search-input" placeholder="Search merchandise..." style="display: none;">
                        <i class="fas fa-search"></i>
                    </div>
                    <div class="cart-icon-container">
                        <i class="fas fa-shopping-bag"></i>
                        <span class="cart-badge" style="display: none;">0</span>
                    </div>
                </div>
            </div>
            <div class="categories">
                <button class="category-btn active" data-category="all">ALL</button>
                <button class="category-btn" data-category="apparel">APPAREL</button>
                <button class="category-btn" data-category="music">MUSIC</button>
            </div>
            <div class="products-grid">
                ${products.filter(product => currentCategory === 'all' || product.category === currentCategory).map(product => `
                    <div class="product-item" data-product-id="${product.id}">
                        <img class="product-image" src="${product.image}" alt="${product.name}">
                        <div class="product-id">${product.id}</div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">${product.price}</div>
                        <button class="add-to-cart-btn"><i class="fas fa-plus"></i> ADD TO CART</button>
                    </div>
                `).join('')}
            </div>
        `;
        
        mainContent.innerHTML = html;

        // Add event listeners to category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                currentCategory = category;
                
                // Update active category
                document.querySelectorAll('.category-btn').forEach(b => {
                    if (b.getAttribute('data-category') === category) {
                        b.classList.add('active');
                    } else {
                        b.classList.remove('active');
                    }
                });
                
                // Re-render products
                renderStoresView();
            });
        });

        // Add event listener to search icon
        const searchIcon = document.querySelector('.fa-search');
        const searchInput = document.querySelector('.search-input');
        
        searchIcon.addEventListener('click', function() {
            if (searchInput.style.display === 'none') {
                searchInput.style.display = 'block';
                searchInput.focus();
                searchIcon.classList.add('active');
            } else {
                searchInput.style.display = 'none';
                searchIcon.classList.remove('active');
                // Clear search
                searchInput.value = '';
                filterProducts('');
            }
        });

        // Add event listener to search input
        searchInput.addEventListener('input', function() {
            filterProducts(this.value);
        });

        // Add event listener to cart icon
        document.querySelector('.cart-icon-container').addEventListener('click', function() {
            openCartModal();
        });

        // Add event listeners to product items
        document.querySelectorAll('.product-item').forEach(item => {
            item.addEventListener('click', function(e) {
                const productId = this.getAttribute('data-product-id');
                const product = products.find(p => p.id === productId);
                
                // If clicked on add to cart button
                if (e.target.classList.contains('add-to-cart-btn') || e.target.parentElement.classList.contains('add-to-cart-btn')) {
                    e.stopPropagation();
                    handleProductClick(product);
                }
            });
        });

        // Update cart badge
        updateCartBadge();
    }

    function renderEventsView() {
        let html = `
            <div class="header">
                <div class="header-item">EVENTS</div>
            </div>
            <div class="menu">
                <div class="menu-item">UPCOMING</div>
            </div>
            <div class="events-grid">
                ${events.map(event => `
                    <div class="event-card">
                        <div class="event-title">${event.title}</div>
                        <div class="event-subtitle">${event.subtitle}</div>
                        <div class="event-desc">${event.description}</div>
                        <div class="event-location">${event.location}</div>
                        <div class="event-venue">${event.venue}</div>
                        <div class="event-date">${event.date}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        mainContent.innerHTML = html;
    }

    function renderHQLView() {
        let html = `
            <div class="header">
                <div class="header-item">HQL</div>
            </div>
            <div class="message-container">
                ${messages.map(message => `
                    <div class="message-bubble ${message.from === 'y' ? 'message-from-y' : ''}">
                        ${message.text}
                    </div>
                    <div class="message-info ${message.from === 'y' ? 'message-info-y' : ''}">
                        ${message.time}
                    </div>
                `).join('')}
            </div>
        `;
        
        mainContent.innerHTML = html;
    }

    // Player Functions
    function playTrack(track, album) {
        currentTrack = track;
        currentAlbum = album;
        isPlaying = true;
        
        // Update mini player
        document.getElementById('mini-album-cover').src = album.cover;
        document.getElementById('mini-track-title').textContent = track.name;
        document.getElementById('mini-track-album').textContent = album.title;
        document.getElementById('mini-play-btn').innerHTML = '<i class="fas fa-pause"></i>';
        
        // Update expanded player
        document.getElementById('player-album-title').textContent = album.title;
        document.getElementById('player-album-cover').src = album.cover;
        document.getElementById('player-track-title').textContent = track.name;
        document.getElementById('player-track-artist').textContent = 'YALDI';
        document.getElementById('play-btn-large').innerHTML = '<i class="fas fa-pause"></i>';
        
        // Reset progress
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        totalTimeEl.textContent = track.duration;
        
        // In a real app, this would play the audio file
        // For demo, we'll simulate progress
        simulateProgress();
        
        // If we're in album detail view, update the track list
        if (currentView === 'album-detail') {
            renderAlbumDetail(album);
        }
        
        // Update lyrics if available
        if (lyrics[track.id]) {
            renderLyrics(track.id);
        } else {
            // Clear lyrics
            document.getElementById('lyrics-full-content').innerHTML = '<div class="lyrics-line">No lyrics available for this track.</div>';
        }
    }

    function togglePlay() {
        if (!currentTrack) {
            // If no track is selected, play the first track of the first album
            playTrack(albums[0].tracks[0], albums[0]);
            return;
        }
        
        isPlaying = !isPlaying;
        
        // Update play buttons
        if (isPlaying) {
            document.getElementById('mini-play-btn').innerHTML = '<i class="fas fa-pause"></i>';
            document.getElementById('play-btn-large').innerHTML = '<i class="fas fa-pause"></i>';
            // In a real app, this would play the audio
            simulateProgress();
        } else {
            document.getElementById('mini-play-btn').innerHTML = '<i class="fas fa-play"></i>';
            document.getElementById('play-btn-large').innerHTML = '<i class="fas fa-play"></i>';
            // In a real app, this would pause the audio
            clearTimeout(window.progressTimer);
        }
    }

    function playNextTrack() {
        if (!currentTrack || !currentAlbum) return;
        
        const currentIndex = currentAlbum.tracks.findIndex(t => t.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % currentAlbum.tracks.length;
        playTrack(currentAlbum.tracks[nextIndex], currentAlbum);
    }

    function playPrevTrack() {
        if (!currentTrack || !currentAlbum) return;
        
        const currentIndex = currentAlbum.tracks.findIndex(t => t.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + currentAlbum.tracks.length) % currentAlbum.tracks.length;
        playTrack(currentAlbum.tracks[prevIndex], currentAlbum);
    }

    function toggleShuffle() {
        // Toggle shuffle state
        shuffleBtn.classList.toggle('active');
    }

    function toggleLoop() {
        // Toggle loop state
        loopBtn.classList.toggle('active');
    }

    function expandPlayer() {
        playerContainer.classList.add('expanded');
        document.body.classList.add('player-expanded');
        isPlayerExpanded = true;
    }

    function collapsePlayer() {
        playerContainer.classList.remove('expanded');
        document.body.classList.remove('player-expanded');
        isPlayerExpanded = false;
    }

    function showPlayerView() {
        playerBtn.classList.add('active');
        lyricsBtn.classList.remove('active');
        lyricsContainer.style.display = 'none';
        isLyricsView = false;
    }

    function showLyricsView() {
        lyricsBtn.classList.add('active');
        playerBtn.classList.remove('active');
        lyricsContainer.style.display = 'block';
        isLyricsView = true;
    }

    function simulateProgress() {
        // Clear any existing timer
        clearTimeout(window.progressTimer);
        
        if (!isPlaying) return;
        
        // Get current width
        const currentWidth = parseFloat(progressBar.style.width || '0');
        
        if (currentWidth < 100) {
            // Increment by 0.5%
            const newWidth = currentWidth + 0.5;
            progressBar.style.width = `${newWidth}%`;
            
            // Update time display
            updateTimeDisplay(newWidth);
            
            // Continue simulation
            window.progressTimer = setTimeout(simulateProgress, 500);
        } else {
            // Track finished, play next
            playNextTrack();
        }
    }

    function updateTimeDisplay(percent) {
        if (!currentTrack) return;
        
        // Parse duration (e.g., "3:45" to seconds)
        const [mins, secs] = currentTrack.duration.split(':').map(Number);
        const totalSeconds = mins * 60 + secs;
        
        // Calculate current time
        const currentSeconds = Math.floor(totalSeconds * (percent / 100));
        const currentMins = Math.floor(currentSeconds / 60);
        const currentSecs = currentSeconds % 60;
        
        // Update display
        currentTimeEl.textContent = `${currentMins}:${currentSecs.toString().padStart(2, '0')}`;
    }

    function renderLyrics(trackId) {
        if (!lyrics[trackId]) return;
        
        const lyricsContent = document.getElementById('lyrics-full-content');
        lyricsContent.innerHTML = '';
        
        lyrics[trackId].forEach((line, index) => {
            const lineEl = document.createElement('div');
            lineEl.className = `lyrics-line ${index === 0 ? 'current' : ''} clickable`;
            lineEl.textContent = line;
            
            // Add click event to simulate jumping to that part of the song
            lineEl.addEventListener('click', function() {
                // Remove current class from all lines
                document.querySelectorAll('.lyrics-line').forEach(l => l.classList.remove('current'));
                // Add current class to this line
                this.classList.add('current');
                
                // Simulate jumping to this part of the song
                const percent = (index / lyrics[trackId].length) * 100;
                progressBar.style.width = `${percent}%`;
                updateTimeDisplay(percent);
            });
            
            lyricsContent.appendChild(lineEl);
        });
    }

    // Store Functions
    function filterProducts(query) {
        const productItems = document.querySelectorAll('.product-item');
        const lowerQuery = query.toLowerCase();
        
        let hasResults = false;
        
        productItems.forEach(item => {
            const name = item.querySelector('.product-name').textContent.toLowerCase();
            const id = item.querySelector('.product-id').textContent.toLowerCase();
            
            if (name.includes(lowerQuery) || id.includes(lowerQuery)) {
                item.style.display = 'block';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show no results message if needed
        let noResultsMsg = document.querySelector('.no-products-message');
        
        if (!hasResults) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('p');
                noResultsMsg.className = 'no-products-message';
                noResultsMsg.textContent = 'No products found. Try a different search.';
                document.querySelector('.products-grid').appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    function handleProductClick(product) {
        // For apparel items, show size selector
        if (product.category === 'apparel') {
            selectedProduct = product;
            sizeProductName.textContent = product.name;
            sizeModal.style.display = 'flex';
        } else {
            // For non-apparel items, add directly to cart
            addToCart(product);
        }
    }

    function addToCart(product, size) {
        // Check if item already exists in cart
        const existingItemIndex = cartItems.findIndex(item => 
            item.id === product.id && (!size || item.size === size)
        );
        
        if (existingItemIndex !== -1) {
            // Update quantity if item exists
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // Add new item if it doesn't exist
            cartItems.push({
                ...product,
                quantity: 1,
                size: size
            });
        }
        
        // Update cart badge
        updateCartBadge();
        
        // Show notification
        showAddToCartNotification();
    }

    function updateCartBadge() {
        const badge = document.querySelector('.cart-badge');
        const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    function showAddToCartNotification() {
        // Remove any existing notification
        const existingNotification = document.querySelector('.add-to-cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'add-to-cart-notification';
        notification.textContent = 'Added to cart';
        document.body.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 1500);
    }

    function openCartModal() {
        // Render cart content
        renderCartContent();
        
        // Show modal
        cartModal.style.display = 'flex';
    }

    function renderCartContent() {
        const cartContent = document.getElementById('cart-content');
        
        if (cartItems.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag empty-cart-icon"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            return;
        }
        
        // Calculate total
        const totalPrice = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('€', ''));
            return sum + price * item.quantity;
        }, 0);
        
        cartContent.innerHTML = `
            <div class="cart-items">
                ${cartItems.map((item, index) => `
                    <div class="cart-item" data-index="${index}">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            ${item.size ? `<div class="cart-item-size">Size: ${item.size}</div>` : ''}
                            <div class="cart-item-price">${item.price}</div>
                        </div>
                        <div class="cart-item-actions">
                            <div class="quantity-controls">
                                <button class="quantity-btn decrease-btn" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn increase-btn">+</button>
                            </div>
                            <button class="remove-btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary">
                <div class="cart-total">
                    <span>Total:</span>
                    <span>€${totalPrice.toFixed(2)}</span>
                </div>
                <button class="checkout-btn">CHECKOUT</button>
            </div>
        `;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.closest('.cart-item').getAttribute('data-index'));
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity -= 1;
                    renderCartContent();
                    updateCartBadge();
                }
            });
        });
        
        document.querySelectorAll('.increase-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.closest('.cart-item').getAttribute('data-index'));
                cartItems[index].quantity += 1;
                renderCartContent();
                updateCartBadge();
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.closest('.cart-item').getAttribute('data-index'));
                cartItems.splice(index, 1);
                renderCartContent();
                updateCartBadge();
            });
        });
        
        // Add event listener to checkout button
        document.querySelector('.checkout-btn').addEventListener('click', function() {
            cartModal.style.display = 'none';
            openCheckoutModal();
        });
    }

    // Checkout Functions
    function openCheckoutModal() {
        // Reset checkout state
        currentCheckoutStep = 'shipping';
        
        // Update step indicators
        shippingStepIndicator.classList.add('active');
        shippingStepIndicator.classList.remove('completed');
        paymentStepIndicator.classList.remove('active', 'completed');
        reviewStepIndicator.classList.remove('active', 'completed');
        
        // Render shipping step
        renderShippingStep();
        
        // Show modal
        checkoutModal.style.display = 'flex';
    }

    function renderShippingStep() {
        checkoutContent.innerHTML = `
            <form id="shipping-form" class="checkout-form">
                <h3>Shipping Information</h3>

                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value="${shippingInfo.fullName}"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value="${shippingInfo.address}"
                        required
                    />
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="city">City</label>
                        <input
                            type="text"
                            id="city"
                            value="${shippingInfo.city}"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="zipCode">ZIP Code</label>
                        <input
                            type="text"
                            id="zipCode"
                            value="${shippingInfo.zipCode}"
                            required
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label for="country">Country</label>
                    <select
                        id="country"
                        required
                    >
                        <option value="" ${!shippingInfo.country ? 'selected' : ''}>Select Country</option>
                        <option value="IT" ${shippingInfo.country === 'IT' ? 'selected' : ''}>Italy</option>
                        <option value="US" ${shippingInfo.country === 'US' ? 'selected' : ''}>United States</option>
                        <option value="GB" ${shippingInfo.country === 'GB' ? 'selected' : ''}>United Kingdom</option>
                        <option value="FR" ${shippingInfo.country === 'FR' ? 'selected' : ''}>France</option>
                        <option value="DE" ${shippingInfo.country === 'DE' ? 'selected' : ''}>Germany</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value="${shippingInfo.email}"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        value="${shippingInfo.phone}"
                        required
                    />
                </div>

                <div class="checkout-actions">
                    <button type="button" class="secondary-btn" id="cancel-checkout-btn">
                        Cancel
                    </button>
                    <button type="submit" class="primary-btn">
                        Continue to Payment
                    </button>
                </div>
            </form>
        `;
        
        // Add event listeners
        document.getElementById('shipping-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Save shipping info
            shippingInfo.fullName = document.getElementById('fullName').value;
            shippingInfo.address = document.getElementById('address').value;
            shippingInfo.city = document.getElementById('city').value;
            shippingInfo.zipCode = document.getElementById('zipCode').value;
            shippingInfo.country = document.getElementById('country').value;
            shippingInfo.email = document.getElementById('email').value;
            shippingInfo.phone = document.getElementById('phone').value;
            
            // Move to payment step
            currentCheckoutStep = 'payment';
            shippingStepIndicator.classList.remove('active');
            shippingStepIndicator.classList.add('completed');
            paymentStepIndicator.classList.add('active');
            
            renderPaymentStep();
        });
        
        document.getElementById('cancel-checkout-btn').addEventListener('click', function() {
            checkoutModal.style.display = 'none';
        });
    }

    function renderPaymentStep() {
        checkoutContent.innerHTML = `
            <div class="payment-step">
                <h3>Payment Method</h3>

                <div class="payment-methods">
                    <div class="payment-method ${paymentMethod === 'credit-card' ? 'selected' : ''}" data-method="credit-card">
                        <div class="payment-method-icons">
                            <i class="fab fa-cc-visa"></i>
                            <i class="fab fa-cc-mastercard"></i>
                            <i class="fab fa-cc-amex"></i>
                        </div>
                        <span>Credit Card</span>
                    </div>

                    <div class="payment-method ${paymentMethod === 'paypal' ? 'selected' : ''}" data-method="paypal">
                        <i class="fab fa-paypal payment-icon"></i>
                        <span>PayPal</span>
                    </div>

                    <div class="payment-method ${paymentMethod === 'apple-pay' ? 'selected' : ''}" data-method="apple-pay">
                        <i class="fab fa-apple-pay payment-icon"></i>
                        <span>Apple Pay</span>
                    </div>
                </div>

                <div id="payment-form-container">
                    ${paymentMethod === 'credit-card' ? `
                        <form id="card-form" class="checkout-form">
                            <div class="form-group">
                                <label for="cardNumber">Card Number</label>
                                <div class="card-input-container">
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value="${cardInfo.cardNumber}"
                                        required
                                    />
                                    <div class="card-icons">
                                        <i class="fab fa-cc-visa"></i>
                                        <i class="fab fa-cc-mastercard"></i>
                                        <i class="fab fa-cc-amex"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="cardHolder">Card Holder</label>
                                <input
                                    type="text"
                                    id="cardHolder"
                                    placeholder="John Doe"
                                    value="${cardInfo.cardHolder}"
                                    required
                                />
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="expiryDate">Expiry Date</label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        placeholder="MM/YY"
                                        value="${cardInfo.expiryDate}"
                                        required
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="cvv">CVV</label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        placeholder="123"
                                        value="${cardInfo.cvv}"
                                        required
                                    />
                                </div>
                            </div>

                            <div class="checkout-actions">
                                <button type="button" class="secondary-btn" id="back-to-shipping-btn">
                                    Back
                                </button>
                                <button type="submit" class="primary-btn">
                                    Continue to Review
                                </button>
                            </div>
                        </form>
                    ` : paymentMethod === 'paypal' ? `
                        <div class="alternative-payment">
                            <p>You will be redirected to PayPal to complete your payment.</p>
                            <div class="checkout-actions">
                                <button type="button" class="secondary-btn" id="back-to-shipping-btn">
                                    Back
                                </button>
                                <button type="button" class="primary-btn paypal-btn" id="continue-with-paypal-btn">
                                    <i class="fab fa-paypal"></i> Continue with PayPal
                                </button>
                            </div>
                        </div>
                    ` : `
                        <div class="alternative-payment">
                            <p>You will complete your payment with Apple Pay.</p>
                            <div class="checkout-actions">
                                <button type="button" class="secondary-btn" id="back-to-shipping-btn">
                                    Back
                                </button>
                                <button type="button" class="primary-btn apple-pay-btn" id="continue-with-apple-pay-btn">
                                    <i class="fab fa-apple-pay"></i> Continue with Apple Pay
                                </button>
                            </div>
                        </div>
                    `}
                </div>
            </div>
        `;
        
        // Add event listeners to payment method options
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', function() {
                const selectedMethod = this.getAttribute('data-method');
                paymentMethod = selectedMethod;
                
                // Update selected class
                document.querySelectorAll('.payment-method').forEach(m => {
                    if (m.getAttribute('data-method') === selectedMethod) {
                        m.classList.add('selected');
                    } else {
                        m.classList.remove('selected');
                    }
                });
                
                // Re-render payment form
                renderPaymentStep();
            });
        });
        
        // Add event listener to back button
        document.getElementById('back-to-shipping-btn').addEventListener('click', function() {
            currentCheckoutStep = 'shipping';
            paymentStepIndicator.classList.remove('active');
            shippingStepIndicator.classList.add('active');
            shippingStepIndicator.classList.remove('completed');
            
            renderShippingStep();
        });
        
        // Add event listeners based on payment method
        if (paymentMethod === 'credit-card') {
            document.getElementById('card-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Save card info
                cardInfo.cardNumber = document.getElementById('cardNumber').value;
                cardInfo.cardHolder = document.getElementById('cardHolder').value;
                cardInfo.expiryDate = document.getElementById('expiryDate').value;
                cardInfo.cvv = document.getElementById('cvv').value;
                
                // Move to review step
                currentCheckoutStep = 'review';
                paymentStepIndicator.classList.remove('active');
                paymentStepIndicator.classList.add('completed');
                reviewStepIndicator.classList.add('active');
                
                renderReviewStep();
            });
        } else if (paymentMethod === 'paypal') {
            document.getElementById('continue-with-paypal-btn').addEventListener('click', function() {
                // Move to review step
                currentCheckoutStep = 'review';
                paymentStepIndicator.classList.remove('active');
                paymentStepIndicator.classList.add('completed');
                reviewStepIndicator.classList.add('active');
                
                renderReviewStep();
            });
        } else if (paymentMethod === 'apple-pay') {
            document.getElementById('continue-with-apple-pay-btn').addEventListener('click', function() {
                // Move to review step
                currentCheckoutStep = 'review';
                paymentStepIndicator.classList.remove('active');
                paymentStepIndicator.classList.add('completed');
                reviewStepIndicator.classList.add('active');
                
                renderReviewStep();
            });
        }
    }

    function renderReviewStep() {
        // Calculate totals
        const subtotal = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('€', ''));
            return sum + price * item.quantity;
        }, 0);
        
        const shippingCost = 5.99;
        const total = subtotal + shippingCost;
        
        checkoutContent.innerHTML = `
            <div class="review-step">
                <h3>Review Your Order</h3>

                <div class="review-section">
                    <h4>Items</h4>
                    <div class="review-items">
                        ${cartItems.map(item => `
                            <div class="review-item">
                                <div class="review-item-image">
                                    <img src="${item.image}" alt="${item.name}">
                                </div>
                                <div class="review-item-details">
                                    <div class="review-item-name">${item.name}</div>
                                    ${item.size ? `<div class="review-item-size">Size: ${item.size}</div>` : ''}
                                    <div class="review-item-quantity">Qty: ${item.quantity}</div>
                                </div>
                                <div class="review-item-price">${item.price}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="review-section">
                    <h4>Shipping Address</h4>
                    <div class="review-address">
                        <p>${shippingInfo.fullName}</p>
                        <p>${shippingInfo.address}</p>
                        <p>${shippingInfo.city}, ${shippingInfo.zipCode}</p>
                        <p>${shippingInfo.country}</p>
                        <p>${shippingInfo.email}</p>
                        <p>${shippingInfo.phone}</p>
                    </div>
                </div>

                <div class="review-section">
                    <h4>Payment Method</h4>
                    <div class="review-payment">
                        ${paymentMethod === 'credit-card' ? `
                            <div class="credit-card-info">
                                <div class="card-type">
                                    <i class="fab fa-cc-mastercard"></i>
                                    <span>Credit Card</span>
                                </div>
                                <p>Card ending in ${cardInfo.cardNumber.slice(-4)}</p>
                            </div>
                        ` : paymentMethod === 'paypal' ? `
                            <div class="paypal-info">
                                <i class="fab fa-paypal"></i>
                                <span>PayPal</span>
                            </div>
                        ` : `
                            <div class="apple-pay-info">
                                <i class="fab fa-apple-pay"></i>
                                <span>Apple Pay</span>
                            </div>
                        `}
                    </div>
                </div>

                <div class="order-summary">
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>€${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping</span>
                        <span>€${shippingCost.toFixed(2)}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span>€${total.toFixed(2)}</span>
                    </div>
                </div>

                <div class="checkout-actions">
                    <button type="button" class="secondary-btn" id="back-to-payment-btn">
                        Back
                    </button>
                    <button type="button" class="primary-btn" id="place-order-btn">
                        Place Order
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener to back button
        document.getElementById('back-to-payment-btn').addEventListener('click', function() {
            currentCheckoutStep = 'payment';
            reviewStepIndicator.classList.remove('active');
            paymentStepIndicator.classList.add('active');
            paymentStepIndicator.classList.remove('completed');
            
            renderPaymentStep();
        });
        
        // Add event listener to place order button
        document.getElementById('place-order-btn').addEventListener('click', function() {
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate order processing
            setTimeout(() => {
                currentCheckoutStep = 'confirmation';
                
                // Hide progress steps and header for confirmation
                checkoutHeader.style.display = 'none';
                checkoutProgress.style.display = 'none';
                
                renderConfirmationStep(total);
            }, 2000);
        });
    }

    function renderConfirmationStep(total) {
        const orderNumber = Math.floor(100000 + Math.random() * 900000);
        
        checkoutContent.innerHTML = `
            <div class="confirmation-step">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Order Confirmed!</h3>
                <p>Thank you for your purchase.</p>
                <p>Your order has been placed and is being processed.</p>
                <p>You will receive an email confirmation shortly at ${shippingInfo.email}.</p>

                <div class="order-details">
                    <div class="order-number">
                        <span>Order Number:</span>
                        <span>YZ-${orderNumber}</span>
                    </div>
                    <div class="order-total">
                        <span>Total:</span>
                        <span>€${total.toFixed(2)}</span>
                    </div>
                </div>

                <button type="button" class="primary-btn" id="continue-shopping-btn">
                    Continue Shopping
                </button>
            </div>
        `;
        
        // Add event listener to continue shopping button
        document.getElementById('continue-shopping-btn').addEventListener('click', function() {
            // Clear cart
            cartItems = [];
            updateCartBadge();
            
            // Close modal
            checkoutModal.style.display = 'none';
            
            // Reset checkout UI for next time
            checkoutHeader.style.display = 'flex';
            checkoutProgress.style.display = 'flex';
        });
    }
});