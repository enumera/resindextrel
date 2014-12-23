
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        };
    };

    return false;
};

var main = function(){
  // console.log("logged in user is:");
  // console.log(gon.user_id);
  var dialog;
  var dialogGoal;
  var dialogComment;
  var username;

 // var dateToFormat = function(){
 //  //this function will be fed a date and reformatted as a string.
 //  // all dates being sent back to the server should be in the ruby format required.

 // }

 $.getJSON("/users/" + gon.user_id, function(data){
  console.log(data);
  username = data.first_name;

 });

// createProjectList(1);

  $('#blank_task').click(function(e){

    console.log("blank task works");

      taskInputReset();


      $('#comments-panel').animate({bottom: "-200px"}, 500).fadeOut();
      $('#input-panel').animate({top: "0px"}, 500).fadeIn();

  });


    var refreshTasks = function(){
      console.log("in referesh tasks");
      $('#task-list-group').html('');
      goalId = $('.goalSel').val();

      createTaskRecord(goalId);
   };


   var showComments = function(taskId){

    $('#input-panel').animate({bottom: "-200px"}, 500).fadeOut();
    $('#comments-panel').animate({top: "0px"}, 500).fadeIn();
    var commentList =  $('#comment-list-group');
  
    commentList.html('');

    $.getJSON("/tasks/"+ taskId +"/comments", function(data){

      $.each(data, function(i, comment){
        console.log(comment);


        if(comment.comment_type.comment_switch === "user"){

        listItem = '<button type="button" class="btn btn-info btn-xs pull-right">'+ comment.comment_type.name + '</button><div class="well well-sm comments" id=' + comment.id + '><h4>' + comment.ctext + '</h4></div></div>';
        commentList.append(listItem);
      };
      });
    });
   };

   $('#project-select').on("change", function(){
    console.log("The project has been changed");
  var a = $('#project-select option:selected').val();
    // var $this = $(this);
    console.log(a);

    $('#goal-options').show();
    createGoalsOptions(a);

   });

   
    var createTask = function(){
      var goal_id;
      var taskID =$('.task-form-header').attr("id");
      console.log(taskID);
   
    // if($('.task-form-header').attr("id") ==""){

    //   path = "/users/1/tasks";
    //   method = "POST";

    //   console.log("id works okay");
    // }else{
    //   path = "/users/1/tasks/" + taskID.toString();
    //   method = "PUT";
    // }

      var data = {};


        data['importance'] = $('#importance').val();
        data['difficulty'] = $('#difficulty').val();
        data['start_date'] = $('#start_date').val();
        data['end_date'] = $('#end_date').val();
        data['estimate'] = $('#hours_estimate').val();
        data['completed'] = $('#completed' + taskID).is(":checked");
        // data['card_id'] = cardDetails["card_id"];
        // data['card_name'] = cardDetails["name"];
        data['card_name'] = $('#task_title').val();
        data['card_description'] = $('#task_description').val();
        // data['url'] = cardDetails["url"];
        // data['shortlink'] = cardDetails["shortlink"] ;
        // data['goal_id'] = $('#goal-options option:selected').val();
        // data['project_id'] = $('#project-options option:selected').val();

        console.log(data);

    if($('.task-form-header').attr("id") ==""){

      path = "/users/" + gon.user_id + "/tasks";
      method = "POST";
      goal_id = $('#goal-options option:selected').val();
      data['goal_id'] = $('#goal-options option:selected').val();
      data['project_id'] = $('#project-options option:selected').val();

      console.log("id works okay");
    }else{
      path = "/users/"+ gon.user_id +"/tasks/" + taskID.toString();
      method = "PUT";
      data["id"] = taskID;
    }

           $.ajax({ 
            url: path, 
            method: method,
            data: {task: data},
            dataType: "json"
          }).success(function(){
         
          createTaskRecord(goal_id);
          if(method == "PUT"){
            addNewComment(taskID, "resindex");
          }
          taskInputReset();
        });
      };

      $(document.body).on('click','#project-button', function(){
        console.log("clicked the project button");
        $('.projectSel').val('');
        $('.goalSel').val('');
        createProjectList(0);
        taskInputReset();
      });


      var createProjectList = function(menuOrOptions){
        console.log("in create project list")

        $.getJSON("users/"+ gon.user_id +"/projects", function(data){

          // $('#project-button').fadeOut(500);

            var menuItems = $("#menu-container");
            var projectOptions = $("#project-select");
            var projectOption;
            var projectItem;
            var projectInitialOption;
            menuItems.html('');
            projectOptions.html('');

            projectInitialOption = '<option id="no-project">Select prize</option>';
            menuItems.append('<div class="well well-lg" id="project-button">Prizes</div>');

            projectOptions.append(projectInitialOption);

            $.each(data, function(i, project){
              if(menuOrOptions == 0){
                console.log(data)
              projectItem = '<button class="btn-warning btn-xs pull-right new-goal" value='+ project.id +'>New Stuff</button><div class="well well-sm projects" id=' + project.id + '>' + project.name + '<span class ="pull-right badge">' + project.no_of_goals + '</span></div></div>';
              
              projectOption = '<option value='+project.id+ '>'+ project.name +'</option>'
              menuItems.append(projectItem);
              projectOptions.append(projectOption);
            }else{
              projectOption = '<option value='+project.id+ '>'+ project.name +'</option>';
              projectOptions.append(projectOption);
            };
            });
           ;
        });
      };
  
    $(document.body).on('click', '.completed', function(){

      console.log("in completed");
      console.log($(this));
      var taskId = $(this).val();
      console.log(taskId);
      console.log(gon.user_id);
      var path = "users/"+ gon.user_id +"/tasks/" + taskId;
      var method = "PUT";
      var data = {};

      data["completed"] = $("#completed" + taskId).is(":checked");


      $.ajax({
        url: path,
        method: method,
        data: {task: data},
        dataType: "json"
      }).success(function(data){
        console.log("here");
        console.log(data);

      });
    });


      var createGoalsList = function(projectID){
        console.log("in createGoalsList")

        var menuItems = $('#menu-container');
  

        // menuItems.html('');

        if($('.goals').length==0){

        $.getJSON("/projects/"+ projectID +"/goals", function(data){
          console.log(data);

           $.each(data, function(i, goal){
              var goalItem = '<div class="well well-sm goals project' + projectID + ' " id=' + goal.id + '> ' + goal.name + '<span class ="pull-right badge">  ' + goal.no_of_tasks + '</span></div>';
              menuItems.append(goalItem);

        });
         
      });
      };
    };
     var createGoalsOptions = function(projectID){

        // var menuItems = $('#menu-container');
        var goalOptions = $('#goal-select');
        var goalOption;
        var goalInitialOption;

        // menuItems.html('');

        // if($('.goals').length==0){
          goalOptions.html('');

          // goalInitialOption = '<option id="no-goal">Select goal</option>';
          // goalOptions.append(goalInitialOption);

        $.getJSON("/projects/"+ projectID +"/goals", function(data){

          if(data.length == 0){
            goalInitialOption = '<option value=0 >No goals set</option>';
            goalOptions.append(goalInitialOption);
          }else{

            goalInitialOption = '<option id="no-goal">Select goal</option>';
            goalOptions.append(goalInitialOption);
          }

           $.each(data, function(i, goal){
             goalOption = '<option value=' + goal.id+ '>' + goal.name +'</option>';
             goalOptions.append(goalOption);
             
        });
         
      });
      // };
    };


      var createTaskRecord = function(goal){

        $.getJSON("users/" + gon.user_id +"/tasks", function(data){
            var listItems = $("#task-list-group");
            console.log(data);

            listItems.html("");
            // listItems.hide();

         // recordTime = '<button id='+ card.shortlink + ' class="recordButton" >Record time against task</button>'

          $.each(data, function(i, task){

          if(task.goal_id == goal){

            if (task.effort !=0 ){
              effortMins = parseInt(task.effort * 60);
                if(effortMins > 1){
                effortHours = parseInt(effortMins / 60);
                newEffortMins = effortMins - (effortHours * 60);
                }else{
                  effortHours = 0;
                  newEffortMins = effortMins;
                }
            }else{
              effortHours = 0;
              newEffortMins = 0;
            };

            if (newEffortMins < 10){
              newEffortMins.toString();
              newEffortMins = "0" + newEffortMins;
              console.log(newEffortMins);
            }
            console.log(task.completed);

              var listItem = '<div class="panel panel-default"><button class="commentButton btn btn-xs btn-warning pull-right" value='+ task.id +' >Add a comment</button><div class="panel-heading task-panel" value='+ task.id +' >' + task.card_name +'<span><div class="pull-right" value='+ task.id +'><label for="completed">Completed ?</label><input type="checkbox" class="completed" id="completed'+task.id +'" name="completed" value='+ task.id +'></div></span></div><div class="list-group-item" id= '+ task.id +'>'+ task.id + '<span class ="pull-right badge"> Resindex : ' + task.resindex + '</span><p>Work done to date : ' + effortHours + ' hours ' + newEffortMins + '<span class="pull-right"><button id='+ task.id + ' class="recordButton btn btn-xs btn-warning" >Start work session</button></span></p><p> Start date :' + task.start_date +'</p> <p>End Date : '+ task.end_date + '</p><p><button class="editButton btn btn-warning btn-xs pull-right" >Edit task</button></p></div>';

              listItems.append(listItem);

              if(task.completed===true){
                $('#completed' + task.id).attr('checked', true);
              };
            };
          });
          listItems.fadeIn(1000);
        })
      }

  // setup resindex inputs

   $( "#slider-difficulty" ).slider({
      orientation: "vertical",
      range: "min",
      min: 1,
      max: 5,
      value: 3,
      slide: function( event, ui ) {
        $( "#difficulty" ).val( ui.value );
      }
    });

  $( "#slider-importance" ).slider({
      orientation: "vertical",
      range: "min",
      min: 1,
      max: 5,
      value: 3,
      slide: function( event, ui ) {
        $( "#importance" ).val( ui.value );
      }
    });


  $( "#slider-estimate" ).slider({
      orientation: "vertical",
      range: "min",
      min: 1,
      max: 10,
      value: 5,
      slide: function( event, ui ) {
        $( "#hours_estimate" ).val( ui.value );
      }
    });

    $( "#importance" ).val( $( "#slider-importance" ).slider( "value" ) );

    $( "#difficulty" ).val( $( "#slider-difficulty" ).slider( "value" ) );

    $( "#hours_estimate" ).val( $( "#slider-estimate" ).slider( "value" ) );

   
      $( "#start_date" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
      dateFormat: "dd/mm/yy",
      onClose: function( selectedDate ) {
        $( "#end_date" ).datepicker( "option", "minDate", selectedDate );
      }
      });

    $( "#end_date" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
      dateFormat: "dd/mm/yy",
      onClose: function( selectedDate ) {
        $( "#start_date" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  //create a new task



  $('#new-task').click(function(e){
    
  
      createTask();

  });

  //record function groupings

  var recordingTimeout = function(){
    console.log("in recording Timeout function");
  setTimeout(function(){
             console.log("this works");
            endRecording($this);
           
          // alert("hello")

    }, 600000);
  };

  $('#connect-trello').click(function(){
    console.log("in trello");

    $.ajax({url:"https://api.trello.com/1/client.js?key=8e474beb4e008617593dab5c21cd61ea"}).success(function(){

      AuthenticateTrello();

    });
  });

    // %script{src: "//api.trello.com/1/client.js?key=8e474beb4e008617593dab5c21cd61ea"}

function AuthenticateTrello() {
  Trello.authorize({
    name: "resindex",
    type: "popup",
    interactive: true,
    expiration: "never",
    persist: true,
    success: function () { onAuthorizeSuccessful(); },
    scope: { write: false, read: true },
  });
}
function onAuthorizeSuccessful() {
  var token = Trello.token();
  window.location.replace("/auth?token=" + token);
}

// %a{href: "javascript:void(0)", onClick: "AuthenticateTrello()"}
//   Connect With Trello
// trello

  $(document.body).on('click', '.projects', function(){
    $this = $(this);
    console.log($this);

    projectID = $this.attr("id");
    console.log("this is the project ID");
    console.log($this)

    // if ($this != $('button.new[value'+ projectID + ']')){

    $('button.new-goal[value='+ projectID + ']').addClass("selectedProject");

    $this.addClass("selectedProject");

    $this.removeClass("well-sm");
    $this.addClass("well-lg");
    $('.projectSel').val(projectID);


    $('.projects:not(.selectedProject)').fadeOut(1000);
    $('.new-goal:not(.selectedProject').fadeOut(1000);
    console.log();
    console.log($('.goals').length);

    if($('.goals').length){
      $('.goals:not(selectedGoal)').fadeIn(1000);
       $('.selectedGoal').removeClass("well-lg");
      $('.selectedGoal').addClass("well-sm");
      $('.goals.selectedGoal').removeClass('selectedGoal');
    }else{

  // }
    createGoalsList(projectID);
  };
  });

  $(document.body).on('click', '.goals',function(){
    $this = $(this);
    console.log($this);

    goalID = $this.attr("id");

    $this.addClass("selectedGoal");

    $this.removeClass("well-sm");

    $this.addClass("well-lg");

    $('.goals:not(.selectedGoal)').fadeOut(1000);
    // $('.new-goal:not(.selectedGoal').fadeOut(1000);
    $('.goalSel').val(goalID);
    createTaskRecord(goalID);

  });


    $(document.body).on('click', '.editButton', function(){
      $this = $(this);
      console.log($this);

      //show task frame

      $('#comments-panel').animate({bottom: "-200px"}, 1000).fadeOut();
      $('#input-panel').animate({top: "0px"},3000).fadeIn();
    
      taskID = $this.parent().parent().attr("id");
      // console.log(data);

      $.getJSON("/users/" + gon.user_id +"/tasks/" + taskID, function(data){
        console.log(data);

          $('.task-form-header').attr('id', taskID);

          $('#slider-estimate').slider({value: data.estimate});
          $('#hours_estimate').val(data.estimate);
          $('#slider-difficulty').slider({ value: data.difficulty });
          $('#difficulty').val(data.difficulty);
          $('#slider-importance').slider({value: data.importance});
          $('#importance').val(data.importance)
          $('#start_date').val(data.start_date);
          $('#end_date').val(data.end_date);
          // $('#task_title').text(data.card_name);
          $('#task_title').val(data.card_name);
          $('#task_description').val(data.card_description);
          $('#new-task').text('Update');
          $('#new-task').addClass('update');
          $('.task-form-header').text('Update Task')
        
      });
    });

    var taskInputReset = function(){
      console.log("in input clear");
      $('.task-form-header').attr('id', '');
         $('#slider-estimate').slider({value: 5});
          $('#hours_estimate').val(5);
          $('#slider-difficulty').slider({ value: 3 });
          $('#difficulty').val(3);
          $('#slider-importance').slider({value: 3});
          $('#importance').val(3)
          $('#start_date').val('');
          $('#end_date').val('');
          // $('#task_title').text(data.card_name);
          $('#task_title').val('');
          $('#task_description').val('');
          $('#new-task').text('Post');
          $('#new-task').removeClass('update');
          $('#new-task').addClass('new-task');
          $('.task-form-header').text('New Thing')
    };


    $(document.body).on('click', '.recordButton', function(){
      var goalId;
      $this = $(this);
       taskId = parseInt($this.parent().parent().parent().attr('id'));

      if($this.hasClass("recording")){

        endRecording($this);

        goalId = $('.goalSel').val();

        createTaskRecord(goalId)

        addNewComment(taskId, "effort");


      }else{

          taskId = parseInt($this.parent().parent().parent().attr('id'));
          userId = gon.user_id;
          console.log(taskId);
          // taskId = parseInt($this.siblings().attr('id'));
          // alert(cardId);

          $this.addClass("recording")

          $this.parent().parent().parent().addClass("active");
          $this.parent().parent().prepend('<span id="hours"></span><span id="minutes"></span><span id="seconds"></span></p><p>');

      
          $this.text("Now recording!");
          record(userId, taskId, 0, -1);

          recordingTimeout($this);
          clock();
      };
    });

    


    endRecording = function(item){

      clearInterval(recordingTimeout);

      taskId = parseInt(item.parent().parent().parent().attr('id'));
      // taskId = parseInt(item.siblings().attr('id'));
      // alert(cardId);

      recordId = parseInt(item.val());

      item.removeClass("recording")

      item.parent().parent().parent().removeClass("active");

      item.text("Start work session");
      record(userId, taskId, recordId, -2 );

      stopClock();

      // $('#task-list-group').html('');

      // createTaskRecord();

    };

    function updateTask(user_id, task_id){
      var data_y = {};
      path = "users/" + gon.user_id + "/tasks/" + task_id;
      method = "PUT"


      // data_y["user_id"] = user_id;
      // data_y["id"] = task_id;

      $.ajax({
        url: path,
        method: method,
        data: {task: data_y},
        dataType: "json"

      }).success(function(data){

        record(user_id, task_id, recordId, 0)
        console.log("completed!!");
         // resindexCards();

      });
    }


    function record(userId, taskId, recordId, action){

    var data_x = {};

    if(action === -1 ){
      path = "/time_records";
      method = "POST";
      data_x["state"] = "open";

    } else if (action === -2) {

      path = "/time_records/" + recordId;
      method = "PUT";
      data_x["state"]   = "toallocate";

    }else{
      path = "/time_records/" + recordId;
      method = "PUT";
      data_x["state"]   = "closed";
    };

    data_x["user_id"] = userId;
    data_x["task_id"] = taskId


    console.log(data_x);
    $.ajax({
      url: path,
      method: method,
      data: {time_record: data_x},
      dataType: "json"
    }).success(function(data){
      // console.log("put data")
      // console.log(data)
      if(action === -1){
        console.log(data);
        $('.recording').val(data.id);
        $('.recordButton:not(.recording)').fadeOut();
      }else if(action === -2){
        $('.recordButton').fadeIn();
        updateTask(data_x.user_id, data_x.task_id);
      }else{
        console.log("closed and updated")
        refreshTasks();
        stopClock();
      };
    });
  };

var clock = function(){
      var d = new Date;
      var timeStart = d.getTime();


   setInterval(function() {
          var x = new Date();
          var timeNow = x.getTime();
          var timeDiff = timeNow - timeStart;

          var days = Math.floor(timeDiff / (1000 * 3600 * 24)); 
          timeDiff = timeDiff - days * (1000 * 3600 * 24)
          var hours = Math.floor(timeDiff / (1000 * 3600 ));
          timeDiff = timeDiff - hours * (1000 * 3600 );
          var minutes = Math.floor(timeDiff / (1000 * 60 ));
          timeDiff = timeDiff - minutes * (1000 * 60 )
          var seconds = timeDiff / (1000 );

          minutes = ' : ' + minutes;
          seconds = ' : ' + parseInt(seconds);
          
          $('#hours').text(hours);
          $('#minutes').text(minutes);
          $('#seconds').text(seconds);

    }, 33)
}

  $(document.body).on("click", '.commentButton', function(e){

     console.log("new comment button pressed");
     $this = $(this);
     // $('#taskComment_id').attr("value" )
     console.log($this.val());
     var taskID = $this.val();
     var typeItem;
     var initialCommentType = '<option id="no-project">Select Note type</option>';
     console.log(taskID);
        $('.taskComment_id').attr("value", taskID);
        $('#type-select').html('');
        $('#type-select').append(initialCommentType);

        $.getJSON("/comment_types", function(data){
          console.log(data);

          $.each(data, function(i, commentType){

          if(commentType.comment_switch == "user"){


             typeItem = '<option value='+ commentType.id + 'id='+commentType.comment_switch + '>'+ commentType.name +'</option>';
           $('#type-select').append(typeItem);
            };
          });
          
        });

      dialogComment.dialog( "open" );

  })



    var addNewComment = function(taskId, commentType){
          console.log("in new comment")
          var newComment = "";
          var commentType;
          var g = new Date();
          var n = g.toString();
          var a = "";
          // var taskID = taskId; //stub
          var userID = gon.user_id; //stub
          
          data = {};

          console.log(taskId);

          if(commentType === "none"){
            newComment = $('#comment-text').val();
            commentType = $('#type-select option:selected').val();
          }else{
        
         switch(commentType){
            case "effort":
              newComment = "Effort added";
              commentType = 6;
              break;
            case "resindex":
              newComment = "Resindex change";
              commentType = 8;
          
              };
          };


           a = newComment + "<p><sub> logged by: " + username +" at " + n + " </sub></p>";
            newComment = a;

             // var commentType = $('#type-select option:selected').val();

          console.log(newComment.text)
          // $scope.newComment = $scope.newComment + ":created at "+ n;

          path = "/tasks/"+ taskId +"/comments";
          method = "POST";
          data["ctext"] = newComment; 
          data["task_id"] = taskId;
          data["user_id"] = userID;
          data["comment_type_id"] = commentType;

          $.ajax({
          url: path,
          method: method,
          data: {comment: data},
          dataType: "json"
          });

          showComments(taskId);
          dialogComment.dialog("close");
          
        };
      

var stopClock = function(){

  clearInterval(clock)
}

var addProject = function(){

  console.log("added new project");

  path = "/users/" + gon.user_id+ "/projects";
  method = "POST";

  data = {};

  data["name"] = $('#project-name').val();
  // data["user_id"] = gon.user_id;

  console.log(data);
  $.ajax({ 
        url: path, 
        method: method,
        data: {project: data},
        dataType: "json"
      })

  dialog.dialog("close");
  $('#project-name').val('');


};

var addGoal = function(){

  console.log("added new goal");

  data = {};

  var project_id = $('.goalproject_id').attr("id");

  console.log("project id is" + project_id);

  data["project_id"] = $('.goalproject_id').attr("id");

  data["name"] = $('#goal-name').val();

  path = "/projects/" + project_id + "/goals";
  method = "POST";

  console.log(data);
  $.ajax({ 
        url: path, 
        method: method,
        data: {goal: data},
        dataType: "json"
      }).success(function(){

          dialogGoal.dialog("close");
          $('#goal-name').val('');
  createGoalsList(project_id);
 });

};


dialogComment = $( "#new-comment-modal" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Add new comment": function(){
        var taskId = $('.taskComment_id').val();
        addNewComment(taskId, "none");
        },
        Cancel: function() {
          dialogComment.dialog( "close" );
        }
      },
      close: function() {
        dialogComment.dialog("close"); 
        // form[ 0 ].reset();
        // allFields.removeClass( "ui-state-error" );
      }
    });


dialogGoal = $( "#new-goal-modal" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Add new goal": function(){
          addGoal();
          // dialogGoal.dialog("close");
          // $('#goal-name').val('');
          // createGoalsList(project_id);
        },
  
        Cancel: function() {
          dialogGoal.dialog( "close" );
        }
      },
      close: function() {
        dialogGoal.dialog("close"); 
        // form[ 0 ].reset();
        // allFields.removeClass( "ui-state-error" );
      }
    });

dialog = $( "#new-project-modal" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Add new prize": addProject,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        dialog.dialog("close"); 
        // form[ 0 ].reset();
        // allFields.removeClass( "ui-state-error" );
      }
    });

// createProjectList();



$(document.body).on('click', '.task-panel', function(){
$this = $(this);
console.log($this);
$('#input-panel').animate({bottom: "-200px"}, 500).fadeOut();
$('#comments-panel').animate({top: "0px"}, 500).fadeIn();
var taskId = $this.children().children().first().attr("value");


console.log(taskId);

showComments(taskId);

});

 $( "#new-project" ).click(function(e) {
  console.log("new project button pressed")
      dialog.dialog( "open" );
    });

 $(document.body).on('click', 'button.new-goal', function(e) {
  console.log("new goal button pressed")
  $this = $(this);
  console.log($this);
 var projectGoalId = $this.val();
  console.log("project id is" + projectGoalId);
  // console.log($this.parent().parent());
  // project_id = $this.attr("id");
  $('.goalproject_id').attr("id", projectGoalId );
      dialogGoal.dialog( "open" );
  });

$(document.body).on('click', '#refresh', function(){
taskInputReset();   
});

// $('#input-panel').animate({bottom: "-200px"}, 1000).fadeOut();
// $('#comments-panel').animate({top: "0px"},3000);

// createTaskRecord();
// clock();
createProjectList(1);
$('#comments-panel').hide();

};

$(document).ready(main)