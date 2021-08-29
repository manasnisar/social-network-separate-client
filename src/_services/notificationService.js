export const notificatonService = {
  readNotifications,
  fetchNotifications
};

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function readNotifications(notificationIds) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({
      notificationIds
    })
  };

  return fetch("process.env.REACT_APP_SERVER_URL/api/notification/readNotifications/", requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function fetchNotifications(queryOptions) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("user")).token
    },
    body: JSON.stringify({
      ...queryOptions
    })
  };

  return fetch("process.env.REACT_APP_SERVER_URL/api/notification/getNotifications/", requestOptions)
    .then(handleResponse)
    .then(res => {
      return res.data;
    });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
