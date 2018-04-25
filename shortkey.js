/**
 * v1.0.0
 * bind shortkey to specefic link or button
 */

// bind shortkeys
bindHtmlShortkey();

/**
 * [bindHtmlShortkey description]
 * @return {[type]} [description]
 */
function bindHtmlShortkey()
{
  console.log(1);
  $(document).keydown(function(_e) { shortkey_corridor.call(this, _e)});
}


/**
 * corridor of all events on keyboard and mouse
 * @param  {[type]} e     the element that event doing on that
 * @param  {[type]} _self seperated element for doing jobs on it
 * @param  {[type]} _key  the key pressed or click or another events
 * @return {[type]}       void func not returning value! only doing job
 */
function shortkey_corridor(_e, _self, _key)
{
  console.log(2);
  if(!_key)
  {
    _key = _e.which;
  }

  _self = $(_self);
  var ctrl   = _e.ctrlKey  ? 'ctrl'  : '';
  var shift  = _e.shiftKey ? 'shift' : '';
  var alt    = _e.altKey   ? 'alt'   : '';
  var mytxt  = String(_key) + ctrl + alt + shift;

  // logy(mytxt, 'info');

  var elShortkey = $('[data-shortkey= '+ mytxt +']');
  if(elShortkey.length == 1)
  {
    // this shortkey has called function
    if(shortkeyCallFunc(elShortkey, _e))
    {
      // if yse prevent default changes
      _e.preventDefault();
    }
    else
    {
      // else do some default event like click or set focus
      if(elShortkey.is('a[href], a[href] *, button, input[type=submit]'))
      {
        elShortkey.trigger("click");
        return;
      }
      else if(elShortkey.is('input, select, textarea'))
      {
        elShortkey.focus();
      }
      _e.preventDefault();
    }

  }
  else if(shortkeyCallFunc(elShortkey, _e))
  {
    // if yes prevent default changes
    _e.preventDefault();
  }
}


/**
 * [shortkeyCallFunc description]
 * @return {[type]} [description]
 */
function shortkeyCallFunc(_elShortkey, _e)
{
    var myFuncCall = _elShortkey.attr('data-shortkey-call');
    // this shortkey has called function
    if(myFuncCall !== undefined)
    {
      myFuncCall = 'shortkey_'+ myFuncCall;
      // if function exist
      if(callFunc(myFuncCall, null, true))
      {
        callFunc(myFuncCall, _e);
        return true;
      }
      else
      {
        logy('shortkey func is not exist!');
      }
    }
    return false;
}


