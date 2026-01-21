# paginas-infinitas
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Páginas Infinitas - Sua Livraria Online</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Georgia', serif;
            background-color: #f5f5f5;
            color: #333;
        }

        header {
            background-color: #1e3a8a;
            padding: 1.5rem 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: white;
        }

        .logo-icon {
            width: 50px;
            height: 50px;
            background-color: #2563eb;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            font-size: 2rem;
        }

        .logo h1 {
            font-size: 1.8rem;
            font-weight: 600;
        }

        .menu-toggle {
            background: none;
            border: none;
            color: white;
            font-size: 1.8rem;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .menu-toggle span {
            width: 30px;
            height: 3px;
            background-color: white;
            border-radius: 2px;
        }

        .mobile-menu {
            display: none;
            position: fixed;
            top: 0;
            right: 0;
            width: 300px;
            height: 100vh;
            background-color: white;
            box-shadow: -2px 0 10px rgba(0,0,0,0.2);
            z-index: 1000;
            padding: 2rem;
        }

        .mobile-menu.active {
            display: block;
        }

        .close-menu {
            text-align: right;
            font-size: 2rem;
            color: #1e3a8a;
            cursor: pointer;
            margin-bottom: 2rem;
        }

        .mobile-menu nav {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .mobile-menu a {
            color: #333;
            text-decoration: none;
            font-size: 1.2rem;
            padding: 0.8rem;
            border-bottom: 1px solid #e5e5e5;
        }

        .search-bar {
            padding: 1.5rem 2rem;
            background-color: white;
        }

        .search-bar input {
            width: 100%;
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
        }

        .hero {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            padding: 4rem 2rem;
            text-align: center;
        }

        .hero h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .hero p {
            font-size: 1.2rem;
            opacity: 0.9;
        }

        .categories {
            padding: 3rem 2rem;
            background-color: white;
        }

        .categories h3 {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 2rem;
            color: #1e3a8a;
        }

        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1.5rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .category-card {
            background-color: #f8fafc;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .category-card:hover {
            transform: translateY(-5px);
            border-color: #2563eb;
            box-shadow: 0 8px 20px rgba(37, 99, 235, 0.2);
        }

        .category-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #2563eb;
        }

        .category-card h4 {
            font-size: 1.2rem;
            color: #333;
        }

        .books-section {
            padding: 3rem 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .section-title {
            font-size: 2rem;
            margin-bottom: 2rem;
            color: #1e3a8a;
        }

        .books-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 2rem;
        }

        .book-card {
            background-color: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
        }

        .book-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .book-image {
            width: 100%;
            height: 400px;
            object-fit: cover;
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .book-image img {
            max-width: 80%;
            max-height: 90%;
            object-fit: contain;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .category-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background-color: white;
            color: #2563eb;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
        }

        .book-info {
            padding: 1.5rem;
        }

        .book-rating {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.8rem;
        }

        .stars {
            color: #fbbf24;
            font-size: 1.2rem;
        }

        .rating-count {
            color: #666;
            font-size: 0.9rem;
        }

        .book-title {
            font-size: 1.4rem;
            margin-bottom: 0.5rem;
            color: #1e3a8a;
        }

        .book-author {
            color: #666;
            margin-bottom: 1rem;
            font-size: 1rem;
        }

        .book-price {
            font-size: 1.8rem;
            color: #2563eb;
            font-weight: bold;
            margin-bottom: 1rem;
        }

        .book-actions {
            display: flex;
            gap: 1rem;
        }

        .btn {
            flex: 1;
            padding: 0.8rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }

        .btn-primary {
            background-color: #2563eb;
            color: white;
        }

        .btn-primary:hover {
            background-color: #1e40af;
        }

        .btn-secondary {
            background-color: white;
            color: #2563eb;
            border: 2px solid #2563eb;
        }

        .btn-secondary:hover {
            background-color: #eff6ff;
        }

        footer {
            background-color: #1e3a8a;
            color: white;
            padding: 3rem 2rem;
            margin-top: 4rem;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .footer-section h4 {
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section ul li {
            margin-bottom: 0.5rem;
        }

        .footer-section a {
            color: rgba(255,255,255,0.8);
            text-decoration: none;
        }

        .footer-section a:hover {
            color: white;
        }

        .footer-bottom {
            text-align: center;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.2);
        }

        @media (max-width: 768px) {
            .hero h2 {
                font-size: 1.8rem;
            }

            .category-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .books-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="logo">
            <div class="logo-icon">📖</div>
            <h1>Páginas Infinitas</h1>
        </div>
        <button class="menu-toggle" onclick="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </header>

    <div class="mobile-menu" id="mobileMenu">
        <div class="close-menu" onclick="toggleMenu()">✕</div>
        <nav>
            <a href="#home">Início</a>
            <a href="#categories">Categorias</a>
            <a href="#blog">Blog</a>
            <a href="#about">Sobre</a>
        </nav>
    </div>

    <div class="search-bar">
        <input type="text" placeholder="Buscar livros...">
    </div>

    <section class="hero">
        <h2>Descubra Sua Próxima</h2>
        <h2>Grande Aventura</h2>
        <p>Milhares de livros esperando por você</p>
    </section>

    <section class="categories" id="categories">
        <h3>Explorar Categorias</h3>
        <div class="category-grid">
            <div class="category-card">
                <div class="category-icon">📚</div>
                <h4>Ficção</h4>
            </div>
            <div class="category-card">
                <div class="category-icon">📖</div>
                <h4>Não-ficção</h4>
            </div>
            <div class="category-card">
                <div class="category-icon">📘</div>
                <h4>Autoajuda</h4>
            </div>
            <div class="category-card">
                <div class="category-icon">📗</div>
                <h4>Negócios</h4>
            </div>
            <div class="category-card">
                <div class="category-icon">💕</div>
                <h4>Romance</h4>
            </div>
            <div class="category-card">
                <div class="category-icon">🔍</div>
                <h4>Suspense</h4>
            </div>
            <div class="category-card">
                <div class="category-icon">🧸</div>
                <h4>Infantil</h4>
            </div>
        </div>
    </section>

    <section class="books-section">
        <h2 class="section-title">Livros em Destaque</h2>
        <div class="books-grid">
            <div class="book-card">
                <div class="book-image">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/81l3rZK4lnL.jpg" alt="O Alquimista">
                    <div class="category-badge">Ficção</div>
                </div>
                <div class="book-info">
                    <div class="book-rating">
                        <span class="stars">⭐</span>
                        <span>4.5</span>
                        <span class="rating-count">(4448)</span>
                    </div>
                    <h3 class="book-title">O Alquimista</h3>
                    <p class="book-author">Paulo Coelho</p>
                    <div class="book-price">R$ 46,32</div>
                    <div class="book-actions">
                        <button class="btn btn-secondary">Detalhes</button>
                        <button class="btn btn-primary">🛒 Comprar</button>
                    </div>
                </div>
            </div>

            <div class="book-card">
                <div class="book-image">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/81QuEGw8VPL.jpg" alt="1984">
                    <div class="category-badge">Ficção</div>
                </div>
                <div class="book-info">
                    <div class="book-rating">
                        <span class="stars">⭐</span>
                        <span>4.7</span>
                        <span class="rating-count">(8932)</span>
                    </div>
                    <h3 class="book-title">1984</h3>
                    <p class="book-author">George Orwell</p>
                    <div class="book-price">R$ 38,90</div>
                    <div class="book-actions">
                        <button class="btn btn-secondary">Detalhes</button>
                        <button class="btn btn-primary">🛒 Comprar</button>
                    </div>
                </div>
            </div>

            <div class="book-card">
                <div class="book-image">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg" alt="O Pequeno Príncipe">
                    <div class="category-badge">Infantil</div>
                </div>
                <div class="book-info">
                    <div class="book-rating">
                        <span class="stars">⭐</span>
                        <span>4.9</span>
                        <span class="rating-count">(12456)</span>
                    </div>
                    <h3 class="book-title">O Pequeno Príncipe</h3>
                    <p class="book-author">Antoine de Saint-Exupéry</p>
                    <div class="book-price">R$ 24,90</div>
                    <div class="book-actions">
                        <button class="btn btn-secondary">Detalhes</button>
                        <button class="btn btn-primary">🛒 Comprar</button>
                    </div>
                </div>
            </div>

            <div class="book-card">
                <div class="book-image">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/71m+Qtq+HrL.jpg" alt="Harry Potter">
                    <div class="category-badge">Ficção</div>
                </div>
                <div class="book-info">
                    <div class="book-rating">
                        <span class="stars">⭐</span>
                        <span>4.8</span>
                        <span class="rating-count">(15678)</span>
                    </div>
                    <h3 class="book-title">Harry Potter e a Pedra Filosofal</h3>
                    <p class="book-author">J.K. Rowling</p>
                    <div class="book-price">R$ 52,00</div>
                    <div class="book-actions">
                        <button class="btn btn-secondary">Detalhes</button>
                        <button class="btn btn-primary">🛒 Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h4>Sobre Nós</h4>
                <p>Páginas Infinitas é sua livraria online de confiança, oferecendo milhares de títulos para todos os gostos.</p>
            </div>
            <div class="footer-section">
                <h4>Links Rápidos</h4>
                <ul>
                    <li><a href="#home">Início</a></li>
                    <li><a href="#categories">Categorias</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#about">Sobre</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Atendimento</h4>
                <ul>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Contato</a></li>
                    <li><a href="#">Política de Privacidade</a></li>
                    <li><a href="#">Termos de Uso</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Redes Sociais</h4>
                <ul>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">YouTube</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Páginas Infinitas. Todos os direitos reservados.</p>
        </div>
    </footer>

    <script>
        function toggleMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('active');
        }

        document.addEventListener('click', function(event) {
            const menu = document.getElementById('mobileMenu');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
                menu.classList.remove('active');
            }
        });
    </script>
</body>
</html>
