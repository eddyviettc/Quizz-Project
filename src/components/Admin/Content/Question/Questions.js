import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { FiPlusCircle } from "react-icons/fi";
import { FaMinusCircle, FaCloudUploadAlt } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";



const Questions = (props) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                descreption: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
                ]
            }
        ]
    )
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })

    console.log('check questions', questions)
    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion =
            {
                id: uuidv4(),
                descreption: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ]
            }
            setQuestions([...questions, newQuestion])

        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id)
            setQuestions(questionsClone)
        }
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            }

            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)

        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)


        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionsClone[index].descreption = value;
                setQuestions(questionsClone)
            }


        }
    }
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone)
        }


    }
    const handleAnserQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value;
                        }
                        if (type === 'INPUT') {

                            answer.description = value;
                        }
                    }
                    return answer;
                })

            setQuestions(questionsClone)
        }

    }
    const handleQuestionForQuiz = () => {
        console.log('check question >>', questions)
    }
    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true)

        }
    }
    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label> Select Quiz :</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />

                </div>
                <div className='mt-3 '>
                    Add Questions :
                </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-5'>
                                <div className='questions-content'>
                                    <div className="form-floating description">
                                        <input type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.descreption}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label >Question's {index + 1} Description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`} ><FaCloudUploadAlt className='label-upload' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            type={'file'}
                                            hidden
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}

                                        />
                                        <span>{question.imageName ?
                                            <span
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span>
                                            :
                                            '0 file is uploaded'
                                        }</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')} >
                                            <FiPlusCircle className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)} >
                                                <FaMinusCircle className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnserQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}

                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        value={answer.description}
                                                        type="input"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        onChange={(event) => handleAnserQuestion('INPUT', answer.id, question.id, event.target.value)}

                                                    />
                                                    <label >asnwer {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)} >
                                                        <FiPlusCircle className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 0 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)} >
                                                            <FaMinusCircle className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        )
                    })
                }
                {questions && questions.length > 0 &&
                    <div>
                        <button
                            className='btn btn-warning'
                            onClick={() => handleQuestionForQuiz()}

                        >Save Question</button>
                    </div>
                }

                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}


                    ></Lightbox>
                }
            </div>

        </div>
    )
}

export default Questions