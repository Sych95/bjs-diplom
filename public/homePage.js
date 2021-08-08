'user strict'

const logoutbtn = new LogoutButton();

logoutbtn.action = function () {
    ApiConnector.logout(response => {
        console.log(response);
        if (response.success === true) {
            location.reload();
        } else console.log('Ошибка:' + response.error);
    })
}

const currentUser = function () {
    ApiConnector.current(function (response) {
        console.log(response);
        if(response.success === true) {
            ProfileWidget.showProfile(response.data)
        }
    })
}
currentUser();

const ratesBoard = new RatesBoard;

function getRate () {
    ApiConnector.getStocks(function (response) {
        console.log(response);

        if(response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}

getRate ();
setInterval(() => getRate (), 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, function(response){
        console.log(response);
        if(response.success === true) {
            ProfileWidget.showProfile(response.data)
            moneyManager.setMessage(response.success, 'Пополнение успешно');
        } else moneyManager.setMessage(response.success, response.error);
        
        // почему-то в случае успеха undefined
    })
}

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, function (response) {
        console.log(response);
        if(response.success === true) {
            ProfileWidget.showProfile(response.data)
            moneyManager.setMessage(response.success, 'Успешно');
        } else moneyManager.setMessage(response.success, response.error); 
        
        
    })
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, function(response){
        console.log(response);
        if(response.success === true) {
            ProfileWidget.showProfile(response.data)
            moneyManager.setMessage(response.success, 'Успешно');
        } else moneyManager.setMessage(response.success, response.error);
        
        // почему-то в случае успеха undefined
    })
}

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(function(response) {
    console.log(response)
    if(response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data)
    }
})

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, function(response) {
        
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data)
            favoritesWidget.setMessage(response.success, 'Пользователь добавлен');
        } else favoritesWidget.setMessage(response.success, response.error);
    })
}

favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, function(response){
        console.log(response)
        if(response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь удален');
        } else favoritesWidget.setMessage(response.success, response.error);
    })
}

