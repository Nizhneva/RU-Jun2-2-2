import styles from './app.module.css';
import {useState} from "react"

export const App = () => {
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isValueVaild, setIsValueVaild] = useState(false);

    const onInputButtonClick = () => {
        const promptValue = prompt();
        if (promptValue === null || promptValue.length < 3) {
            setIsError(true);
            setIsValueVaild(false);
        } else {
            setIsError(false);
            setIsValueVaild(true);
        }
        setValue(promptValue);
    }

    const clearStates = () => {
        setValue("");
        setIsError(false);
        setIsValueVaild(true);
    }

    const onAddButtonClick = () => {
        const updatedList = [...list, {
            id: Date.now(),
            value: value
        }];
        console.log("-----", updatedList);
        setList(updatedList);
        clearStates();
    }

    return (
        <div className={styles.app}>
            <h1 className={styles.pageHeading}>
                Ввод значения
            </h1>

            <p className={styles.noMarginText}>
                Текущее значение <code>value</code>: "<output className={styles.currentValue}>{value}</output>"
            </p>

            {
                isError && 
                    <div className={styles.error}>
                        Введенное значение должно содержать минимум 3 символа
                    </div>
            }

            <div className={styles.buttonsContainer}>
                <button
                    className={styles.button}
                    onClick={onInputButtonClick}
                >
                    Ввести новое
                </button>

                <button
                    className={styles.button}
                    disabled={!isValueVaild}
                    onClick={onAddButtonClick}
                >
                    Добавить в список
                </button>
            </div>

            <div className={styles.listContainer}>
                <h2 className={styles.listHeading}>
                    Список:
                </h2>

                {
                    list.length === 0 ?
                        <p className={styles.noMarginText}>
                            Нет добавленных элементов
                        </p> :
                        <ul className={styles.list}>
                            {
                                list.map((listItem) => (
                                    <li
                                        className={styles.listItem}
                                        key={listItem.id}
                                    >
                                        {listItem.value}
                                    </li>
                                ))
                            }
                        </ul>
                }
            </div>
        </div>
    )
}
