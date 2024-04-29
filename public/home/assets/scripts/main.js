angular.module('FeedbackLoopHome', [])
    .controller('HomeController', function ($scope, $http, $timeout) {
        $scope.userData = JSON.parse(localStorage.getItem("user"));
        $scope.message = "";
        $scope.data = [];
        $scope.chatContent = document.getElementById("chat-container");

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
                    console.log(res);
                    $scope.data = res.data;
                    $timeout(() => {
                        $scope.chatContent.scrollTop = $scope.chatContent.scrollHeight;
                    });
                    console.log($scope.data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred. Please try again later.");
                });
        };

        $scope.loadMessages();
    });
