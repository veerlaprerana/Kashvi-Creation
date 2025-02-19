import React from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./Blog.css";
import { Link } from "react-router-dom";


function Navbar() {
    return (
      <nav className="navbar">
        <h1 className="logo">Welcome to Kashvi Creation</h1>
      </nav>
    );
  }
  
  function NavLinks() {
    // const navigate = useNavigate();
    return (
      <div className="nav-links-wrapper">
        {/* <div classname =""></div> */}
        <div className="logo-container">
        <img src="/IMG-20250204-WA0006l.jpg" alt="Kashvi Logo" className="kashvi-logo" />
        </div>
        
      </div>
    );
  }

const BlogPage = () => {
  const blogPosts = [
    {
      title: "The Art of Saree Draping",
      date: "February 5, 2025",
      content: "Discover the various styles of draping a saree, from traditional to modern designs.",
      image: "https://i.pinimg.com/736x/61/da/06/61da068ce9d3568a596163dc207f2ef4.jpg",
      link: "https://balaramsaha.com/blogs/news/the-art-of-draping-mastering-the-elegance-of-traditional-sarees"
    },
    {
      title: "Choosing the Perfect Saree for Any Occasion",
      date: "February 7, 2025",
      content: "A guide to selecting the best saree for weddings, parties, and office wear.",
      image: "https://i.pinimg.com/736x/34/59/f5/3459f51507a0306ca17511e05ef8a7e3.jpg",
      link: "https://rangraze.in/blogs/news/how-to-choose-the-perfect-saree-for-every-occasion"
    },
    {
      title: "Saree Styling Tips for a Modern Look",
      date: "February 10, 2025",
      content: "Learn how to pair sarees with trendy accessories for a fusion look.",
      image: "https://i.pinimg.com/736x/72/bb/40/72bb407aa285bf4e108b96da599c7963.jpg",
      link :"https://singhanias.in/blogs/singhanias-saree-journal/saree-styling-tips-for-festivals"
    },
  ];

  return (<> 
  <Navbar />
  <NavLinks/>
  <Header />
    <div className="page-wrapper">
     

      <main className="blog-container">
        {/* Hero Section */}
        <section className="hero">
          <h1>Our Blogs</h1>
          <motion.p 
            className="animated-text"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
          >
            ~ प्रेम और विश्वास का अनोखा संगम ~
          </motion.p>
        </section>

        {/* Blog Posts Grid */}
        <section className="blog-grid">
          {blogPosts.map((post, index) => (
            <div key={index} className="blog-card">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h2>{post.title}</h2>
                <small>{post.date}</small>
                <p>{post.content}</p>
                <button className="read-more" onClick={() => window.open(post.link, "_blank")} style={{ fontFamily: "Cinzel", color:"black" }}>Read More</button>
              </div>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <div className="cta">
          <h2 className="discover" style={{ fontFamily: "Cinzel" }}>Discover Our Exclusive Saree Collection</h2>
          
          <Link to="/catalogue" className="btn">Shop Now</Link>
        </div>
       
      </main>
      
    </div>
      <Footer />
    </>
  );
};

export default BlogPage;
