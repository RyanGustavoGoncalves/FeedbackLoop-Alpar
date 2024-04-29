const app = angular.module('FeedbackLoop', []);

app.controller('FeedbackController', function ($scope, $http) {
    $scope.username = "";
    $scope.password = "";

    $scope.submit = () => {
        console.log($scope.username);
        console.log($scope.password);

        $http.post("http://localhost:3000/api/register", {
            username: $scope.username,
            password: $scope.password,
        })
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
                window.location.href = "/home";
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    };
});