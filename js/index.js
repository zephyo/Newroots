$( document ).ready(function() {
  $('section.user').hide();
  $('section.network').hide();
  
  $('#submit').on('click', function(){
    $('.modal-bg').hide();
  });
  
  $('#user-but').on('click', function(){
    let sect = $('.active-section');
    sect.hide();
    sect.removeClass('active-section');
    
    let user = $('section.user');
    user.show();
    user.addClass('active-section');
  });
  
  $('#feed-but').on('click', function(){
    let sect = $('.active-section');
    sect.hide();
    sect.removeClass('active-section');
    
    let user = $('section.feed');
    user.show();
    user.addClass('active-section');
  });
  
  $('#network-but').on('click', function(){
    let sect = $('.active-section');
    sect.hide();
    sect.removeClass('active-section');
    
    let user = $('section.network');
    user.show();
    user.addClass('active-section');
  });
  
  autosize($('textarea'));
  
});