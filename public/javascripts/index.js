var onLinkedInLoad = function () {
  IN.Event.on(IN, 'auth', function () {
    IN.API.Profile('me').result(function () {
      console.log(arguments);
    })
  })
}
