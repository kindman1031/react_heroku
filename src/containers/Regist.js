import React from 'react';
import { browserHistory } from 'react-router';
import { Auth } from '../services/index';

export class Regist extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            email: '',
            password: '',
            fullname: '',
            passwordCF: '',
        };
    }

    handleChange(field, e) {
        this.setState(Object.assign({}, this.state, { [field]: e.target.value }))
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password != '' && this.state.password == this.state.passwordCF) {
            Auth.regist(this.state)
                .then(() => this.goToLogin());
        }
        else {
            alert("Invalid Password!")
        }

    }

    goToLogin() {
        browserHistory.push('/login');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="panel panel-default col-sm-6 col-md-4 col-md-offset-4">
                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit.bind(this)} noValidate>
                                <div className="form-group">
                                    <label className="label-control">Full Name</label>
                                    <input
                                        className="form-control"
                                        value={this.state.fullname}
                                        onChange={this.handleChange.bind(this, 'fullname')} />
                                </div>
                                <div className="form-group">
                                    <label className="label-control">Email</label>
                                    <input
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={this.handleChange.bind(this, 'email')} />
                                </div>
                                <div className="form-group">
                                    <label className="label-control">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={this.handleChange.bind(this, 'password')} />
                                </div>
                                <div className="form-group">
                                    <label className="label-control">Password Confirm</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={this.state.passwordCF}
                                        onChange={this.handleChange.bind(this, 'passwordCF')} />
                                </div>
                                <button type="submit" className="btn btn-default">
                                    Regist
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
