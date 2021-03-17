import React from 'react';
import {Carousel} from "react-bootstrap";
import first from '../../images/first.jpg'

const Preview = () => {
    return (
        <div>
            <Carousel style={{marginTop: '50px'}}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={first}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <div>
                            Обьединяйся по группам!
                        </div>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={first}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={first}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Preview;
