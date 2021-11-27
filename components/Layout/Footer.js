import React from 'react'

function Footer() {
    return (
        <div>
            <div className="row" id="fo">
                <div className="col">
                    <h2>Help & Support</h2>
                    <p>Shipping Info</p>
                    <p>Returns</p>
                    <p>How To Order</p>
                </div>
                <div className="col">
                    <h2>Customer Care</h2>
                    <p>Contact Us</p>
                    <p>Payment Method</p>
                    <p>Bonus Point</p>
                </div>
                <div className="col">
                    <h2>Follow Us</h2>
                    <img className="fo-img" src="../image/Footer/face.png" />
                    <img className="fo-img" style={{padding:'5px'}} src="../image/Footer/instagram.png" />
                    <img className="fo-img" src="../image/Footer/YouTube.png" />
                </div>
            </div>
        </div>
    )
}

export default Footer
