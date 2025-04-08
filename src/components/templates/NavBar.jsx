import React from 'react'

function NavBar() {
    return (
        <nav style={{padding:"10px", marginTop:"2%", marginBottom:"10%"}}>
            <ul style={{listStyle:"none", display:"flex", justifyContent:"space-evenly", fontWeight:"600"}}>
                <li><a style={{color:"#a94d72", textDecoration:"none"}} href="/">Home</a></li>
                <li><a style={{color:"#a94d72", textDecoration:"none"}} href="/">Send Money</a></li>
                <li><a style={{color:"#a94d72", textDecoration:"none"}} href="/about">Tools</a></li>
                <li><a style={{color:"#a94d72", textDecoration:"none"}} href="/about">About</a></li>
                <li><a style={{color:"#a94d72", textDecoration:"none"}} href="/contact">Contact</a></li>
            </ul>
        </nav>
    )
}

export default NavBar