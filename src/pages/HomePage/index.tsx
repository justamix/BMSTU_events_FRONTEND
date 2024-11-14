import { Container, Row, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";
import { useState } from "react";
import './index.css'; // Импортируем стили
const items = [
    {
        src: "http://127.0.0.1:9000/bmstulab/ekaterina.png", // Замените URL на актуальный
        altText: "Первый технический университет в России",
        caption: "Прообраз современного вуза, основан при Екатерине II"
    },
    {
        src: "http://127.0.0.1:9000/bmstulab/mgtu.png", // Замените URL на актуальный
        altText: "Здание выдержано в стиле ампира",
        caption: "Здание университета построено в стиле позднего московского ампира"
    },
    {
        src: "http://127.0.0.1:9000/bmstulab/devs.png", // Замените URL на актуальный
        altText: "Инновации и технологии",
        caption: "МГТУ им. Баумана — ведущий технический вуз в России, задающий тренды в науке и технологиях"
    }
];

const HomePage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex: number) => {
		if (animating) return;
		setActiveIndex(newIndex);
	};

    const slides = items.map((item) => {
		return (
			<CarouselItem
				onExiting={() => setAnimating(true)}
				onExited={() => setAnimating(false)}
				key={item.src}
			>
				<img src={item.src} alt={item.altText} className="carousel-image" />
				<CarouselCaption 
					captionHeader={item.altText}
					captionText={item.caption} 
					className="carousel-caption" 
				/>
			</CarouselItem>
		);
	});
    return (
        <Container>
            <Row>
                <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
            </Row>
        </Container>
    );
}

export default HomePage;
