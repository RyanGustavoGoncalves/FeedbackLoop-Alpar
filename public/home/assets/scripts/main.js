angular.module('FeedbackLoopHome', [])
    .controller('HomeController', function ($scope, $http, $timeout) {
        $scope.userData = JSON.parse(localStorage.getItem("user"));
        $scope.message = "";
        $scope.data = [];
        $scope.chatContent = document.getElementById("chatContainer");

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

        $scope.updateMessage = (id) => {
            console.log($scope.inputUpdate);
            $http.put(`http://localhost:3000/api/message/update/${id}`, {
                message: $scope.inputUpdate
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
