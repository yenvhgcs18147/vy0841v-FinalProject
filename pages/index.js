import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout/Layout'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home page</title>
      </Head>

      <Layout>
        <div className="row mx-0"> 
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                  <img src="/image/Home/slide2.jpg" className="slide"/>
                </div>
                <div className="carousel-item" >
                  <img src="/image/Home/slide1.jpg" className="slide"/>
                </div>
                <div className="carousel-item">
                  <img src="/image/Home/slide3.jpg" className="slide"/>
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        
          <div className="container">
            <div className="slogan">
              <h1 className="text-uppercase">Time to </h1>
              <h1 className="text-uppercase center">get lost in </h1>
              <h1 className="text-uppercase text-right">sweet dreams </h1>
            </div>
            <div className="row my-4">
              <div className="info">
                <img className="img-home right" src="../image/Home/Mother-and-Children.jpg"/>
                <h3>Chocolate History</h3>
                <p className="text">
                  Chocolate, chocolate, chocolate was invented by the Mexicans. 
                  The Mayans, Incas, and Aztecs planted cocoa trees and processed 
                  and named it chocolate. Then it was discovered by explorers around the world, bringing cocoa beans mixed with other flavors and later known to the whole world.
                </p>
              </div>  
            </div>
            <div className="text-center">
                <button className="btn btn-dark mt-5" style={{height: '50px', width: '250px', fontSize: '24px'}}>
                  <Link href="/">
                    Shopping Now!
                  </Link>
                </button>
            </div>
        </div>
      </Layout>  

    </div>
    
  )
}


export default Home
