import styles from './app.module.css';
import { useState } from "react"
import data from './data.json';

export const App = () => {
    const [steps, ] = useState(data);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const isFirstStep = activeIndex === 0;
    const isLastStep = activeIndex === steps.length - 1;

    const onPrevClick = () => {
        setActiveIndex((prev) => prev - 1);
    }

    const onNextClick = () => {
        if (isLastStep) {
            setActiveIndex(0);
        } else {
            setActiveIndex((prev) => prev + 1);
        }
    }

    const getStepClasses = (index) => {
        let classes = [styles.stepsItem];
        if (index === activeIndex) {
            classes.push(styles.active);
        } else if (index < activeIndex) {
            classes.push(styles.done);
        }
        return classes.join(" ");
    }

    return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>

				<div className={styles.steps}>
					<div className={styles.stepsContent}>
                        {steps[activeIndex].content}
					</div>

					<ul className={styles.stepsList}>
                        {
                            steps.map((_step, index) => (
                                <li className={getStepClasses(index)}>
                                    <button
                                        className={styles.stepsItemButton}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {index + 1}
                                    </button>

                                    Шаг {index + 1}
                                </li>
                            ))
                        }
					</ul>

					<div className={styles.buttonsContainer}>
						<button
                            className={styles.button}
                            onClick={onPrevClick}
                            disabled={isFirstStep}
                        >
                            Назад
                        </button>

						<button
                            className={styles.button}
                            onClick={onNextClick}
                        >
							{isLastStep ? "Начать сначала" : "Далее"}
						</button>
					</div>
				</div>
			</div>
		</div>
    )
}
