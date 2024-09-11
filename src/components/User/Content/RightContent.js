import { useRef } from "react"
import Countdown from "./Countdown"
import(useRef)
const RightContent = (props) => {

    const { dataQuiz } = props
    const refDiv = useRef([])

    const onTimeup = () => {
        props.handleFinishQuiz()
    }
    console.log(dataQuiz)
    const getClassQuestion = (index, question) => {
        // console.log(index, question)
        //check answered
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true)
            if (isAnswered) {
                return "question selected"
            }
        }
        return "question"
    }

    const handleClickQuestion = (question, index) => {
        props.setIndex(index);

        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question"
                }
            })
        }
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true)
            if (isAnswered) {
                return
            }

        }
        refDiv.current[index].className = "question clicked"
    }
    return (
        <>
            <div className="main-timer">
                <Countdown
                    onTimeup={onTimeup}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&

                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`question-abc-${index}`}
                                className={getClassQuestion(index, item)}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={element => refDiv.current[index] = element}
                            >



                                {index + 1} </div>
                        )

                    })
                }


            </div>
        </>
    )
}

export default RightContent