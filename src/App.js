import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import QuestionsPage from "./components/QuestionsPage";
import Header from "./components/Header";
import Registration from "./components/Registration";
import Settings from "./components/Settings";
import MentorService from "./services/MentorService";
import StudentService from "./services/StudentService";
import TagService from "./services/TagService";
import SingleQuestionPage from "./components/SingleQuestionPage/SingleQuestionPage";
import QuestionsService from "./services/QuestionsService";
import AnswerService from "./services/AnswerService";
import { UserContext } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchMentorPage from "./components/SearchMentorPage";
import UserPrivatePage from "./components/UserPrivatePage";
import PublicUserPage from "./components/PublicUserPage";
import Logout from "./components/Logout";
import TechnologiesService from "./services/TechnologiesService";
import DiscordService from "./services/DiscordService";
import Noty from "noty";

function App() {
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (500 <= error.response.status && error.response.status < 600) {
          new Noty({
            timeout: 20_000,
            text: "We couldn't process your request because an error occured on our side! Our developers are notified about this issue and we fix it as soon as possible. We kindly ask you to repeat it in an another time. Thank You!",
            type: "error",
          }).show();
        }
        return Promise.reject(error);
      }
    );
  }, []);

  const discordService = new DiscordService();
  const [studentService] = useState(new StudentService());
  const questionsService = new QuestionsService();
  const mentorService = new MentorService();
  const answerService = new AnswerService();
  const tagService = new TagService();
  const technologiesService = new TechnologiesService();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsAuthenticated(await studentService.isAuthenticated());
      setIsLoading(false);
    };

    checkAuthentication();
  }, [studentService]);

  if (isLoading) {
    return (
      <Fragment>
        <div className="background">
          <div></div>
          <div></div>
        </div>
        <div>
          <img
            className="spinning-image"
            src="https://journey.code.cool/static/assets/favicon/apple-touch-icon-180x180.png?version=v1.1.0-local-AJA3231O"
            alt="Loading indicator"
          />
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="background">
        <div></div>
        <div></div>
      </div>
      <Container>
        <Router>
          <UserContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
            <Header />
            <Route
              key="registration"
              path="/registration"
              render={() => <Registration studentService={studentService} />}
            ></Route>
            <Route
              key="login"
              path="/login"
              render={() => <Login studentService={studentService} />}
            ></Route>
            <Route
              key="logout"
              path="/logout"
              render={() => <Logout studentService={studentService} />}
            ></Route>
            <ProtectedRoute
              key="questionsPage"
              path="/questions"
              component={() => (
                <QuestionsPage
                  questionsService={questionsService}
                  technologiesService={technologiesService}
                />
              )}
            />
            <ProtectedRoute
              key="singleQuestion"
              path="/question/:id"
              component={(props) => (
                <SingleQuestionPage
                  questionsService={questionsService}
                  answerService={answerService}
                  {...props}
                />
              )}
            />
            <ProtectedRoute
              key="searchMentors"
              path="/mentors"
              component={(props) => (
                <SearchMentorPage
                  mentorService={mentorService}
                  tagService={tagService}
                />
              )}
            />
            <ProtectedRoute
              key="settings"
              path="/settings"
              component={() => (
                <Settings
                  studentService={studentService}
                  discordService={discordService}
                />
              )}
            ></ProtectedRoute>
            <ProtectedRoute
              key="privateMe"
              path="/me"
              component={() => (
                <UserPrivatePage studentService={studentService} />
              )}
            />
            <ProtectedRoute
              key="publicUserPage"
              path="/user/:id"
              component={(props) => (
                <PublicUserPage
                  studentService={studentService}
                  mentorService={mentorService}
                  {...props}
                />
              )}
            />
          </UserContext.Provider>
        </Router>
      </Container>
    </Fragment>
  );
}

export default App;
