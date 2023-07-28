import { Link } from "react-router-dom";

import React from 'react'

const Public = () => {
  return (
    <section className="public">
        <header>
            <h1>Welcome to <span className="nowrap">Dan D. Repairs!</span></h1>
        </header>
        <main className="public__main">
            <p>Indian Electronics</p>
            <address className="public__addr">
                Near LDCE<br />
                Indian Passport Office<br />
               Navrangapura, 380015<br />
                <a href="tel:+919106479126">+91-9106479126</a>
            </address>
            <br />
            <p>Owner: Rohit Sutreja</p>
        </main>
        <footer>
            <Link to="/login">Employee Login</Link>
        </footer>
    </section>

)
}

export default Public
