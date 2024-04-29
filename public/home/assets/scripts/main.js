angular.module('FeedbackLoopHome', [])
    .controller('HomeController', function ($scope, $http, $timeout) {
        $scope.userData = JSON.parse(localStorage.getItem("user"));
        $scope.inputUpdate = ""
        $scope.message = "";
        $scope.modal = false;
        $scope.id = ""
        $scope.data = [];
        $scope.chatContent = document.getElementById("chatContainer");


        $scope.openModal = (id) => {
            $scope.id = id;
            $scope.modal = true;
        }
        $scope.closeModal = () => {
            $scope.modal = false;
        }
        $scope.submit = () => {
            $http.post("http://localhost:3000/api/message/send", {
                message: $scope.message,
                userId: $scope.userData.id
            })
                .then((res) => {
                    $scope.loadMessages();
                    $scope.message = "";
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred. Please try again later.");
                });
        };

        $scope.loadMessages = () => {
            $http.get("http://localhost:3000/api/message/get")
                .then((res) => {
                    $scope.data = res.data;
                    $timeout(() => {
                        $scope.chatContent.scrollTop = $scope.chatContent.scrollHeight;
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred. Please try again later.");
                });
        };

        $scope.updateMessage = (value) => {
            $http.put(`http://localhost:3000/api/message/update/${$scope.id}`, {
                message: value
            })
                .then((res) => {
                    $scope.loadMessages();
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred. Please try again later.");
                });
        }

        $scope.deleteMessage = (id) => {
            $http.delete(`http://localhost:3000/api/message/delete/${id}`)
                .then((res) => {
                    $scope.loadMessages();
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred. Please try again later.");
                });
        }

        $scope.loadMessages();
    });
