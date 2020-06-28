import React from 'react';
import { Button } from 'antd';

import AskQuestion from './AskQuestion';


export default class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postQuestionModal: false,
            questions: []
        }
    }

    componentDidMount() {
        this.loadQuestions();
    }

    loadQuestions(){
        fetch('http://localhost:8000/api/question', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((res) => {
            console.log('res', res);
            if(res.success){
                this.setState({
                    questions:res.questions
                })
            }
        }).catch((e) => {
            console.log("received error", e);
        })
    }


    togglePostQuesModal = (bool) => {
        this.setState({
            postQuestionModal: bool
        })
    }
    handleQuestionPost = (values) => {
        let { questions } = this.state;
        let ques = {
            ...values,
            ans_count: 0,
            views: 0
        }
        console.log("ques", ques)

        fetch('http://localhost:8000/api/question/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ques)
        }).then((res) => {
            return res.json();
        }).then((res) => {
            console.log('res');
            questions.push(ques);
            this.setState({
                questions,
                postQuestionModal: false
            })
        }).catch((e) => {
            console.log("received error", e);
        })
    }

    getTableHeader = () => {
        return (
            <tr>
                <th>S.No.</th>
                <th>Question</th>
                <th>Category</th>
                <th>Answers</th>
                <th>Views</th>
            </tr>
        )
    }

    getTableBody = (questions) => {
        if (!questions || !questions.length) return null;
        return questions.map((eachQuestion, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{eachQuestion.question}</td>
                    <td>{eachQuestion.category}</td>
                    <td>{eachQuestion.ans_count}</td>
                    <td>{eachQuestion.views}</td>
                </tr>
            )
        })
    }

    getQuestions = (questions) => {
        return (
            <table>
                <thead>
                    {this.getTableHeader()}
                </thead>
                <tbody>
                    {this.getTableBody(questions)}
                </tbody>
            </table>
        )
    }

    render() {
        let { postQuestionModal, questions } = this.state;
        return (
            <div>
                <div className="header-style">
                    <h3>Questions</h3>
                    <Button
                        onClick={() => {
                            this.togglePostQuesModal(true);
                        }}
                        type="primary"
                    >Post Question</Button>
                </div>

                {this.getQuestions(questions)}

                <AskQuestion
                    postQuestionModal={postQuestionModal}
                    handleQuestionPost={this.handleQuestionPost.bind(this)}
                    togglePostQuesModal={this.togglePostQuesModal.bind(this)}
                />
            </div>
        )
    }
}