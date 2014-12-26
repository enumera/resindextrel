
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

 $('#user_tasks').text("incomplete tasks : " + gon.user_tasks + " ");
 $('#user_projects').text("projects: " +gon.user_projects + " ");
 $('#user_goals').text("goals : " + gon.user_goals + " ");

var resindexColour = function(taskId, resindex){
  console.log("in resindex colour");
  console.log(taskId);
  console.log(resindex);

  if(resindex >1 && resindex < 1.5){
    
    console.log('.resindex.badge[value='+ taskId +']')
      $('.resindex.badge[value='+ taskId +']').addClass('warning');
      // a.addClass('warning');
  }else if(resindex <1 && resindex >0){
    $('.resindex.badge[value='+ taskId+']').addClass('success');
  }else if (resindex==999){
      $('.resindex.badge[value='+ taskId+']').addClass('primary');
      $('.resindex.badge[value='+ taskId+']').text('reset');
  }else if(resindex== -999){
  $('.resindex.badge[value='+ taskId+']').addClass('info');
      $('.resindex.badge[value='+ taskId+']').text('completed');
  }else if(resindex > 1.51 && resindex < 10){
    $('.resindex.badge[value='+ taskId+']').addClass('danger');
  }else if(resindex == 0){
        $('.resindex.badge[value='+ taskId+']').text('to be set');
  }else{
    console.log("what!!");
  }
};



 $( "#log_in" ).click(function() {
  $( "#log_in_form" ).slideDown( "slow", function() {
    // Animation complete.
  });
});

 $('#task_title').keypress(function(){

  console.log("Im typing in the title");
    if($('#task_title').hasClass("border-red")){
      $('#task_title').removeClass("border-red");
    };
 });

  $('#comment-text').keypress(function(){

  console.log("Im typing in the title");
    if($('#comment-text').hasClass("border-red")){
      $('#comment-text').removeClass("border-red");
    };
 });


 $('#task_title').keypress(function(){

  console.log("Im typing in the title");
    if($('#task_title').hasClass("border-red")){
      $('#task_title').removeClass("border-red");
    };
 });


 var validateTaskForm = function(){
  var foundError = false;
   if($('#task_title').val()== ""){
    console.log("title failed!");
    $('#task_title').addClass("border-red");
    foundError = true;

   };

   if($('#project-select').val()=="none"){
    console.log("project failed");
    $('#project-select').addClass("border-red");
    foundError = true;

   };


   if($('#goal-select').val()=="none"){
    console.log("project failed");
    $('#goal-select').addClass("border-red");
    foundError = true;

   };

   if($('#estimate-select').val()=="none"){
    console.log("estimate failed");
    $('#estimate-select').addClass("border-red");
    foundError = true;

   };


   if($('#difficulty-select').val()=="none"){
    console.log("difficulty failed");
    $('#difficulty-select').addClass("border-red");
    foundError = true;

   };


   if($('#importance-select').val()=="none"){
    console.log("importance failed");
    $('#importance-select').addClass("border-red");
    foundError = true;

   };

    if($('#start_date').val()==""){
    console.log("start date failed");
    $('#start_date').addClass("border-red");
    foundError = true;

   };

  if($('#end_date').val()==""){
    console.log("end date failed");
    $('#end_date').addClass("border-red");
    foundError = true;

   };
   if(foundError ==false){
    createTask();
   }

 };

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

  var checkMenuPanel = function(){

    $('#menu-container').hasClass('frozen');

  };

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

   $('#goal-select').on("change", function(){
    // console.log("Im typing in the title");
    if($('#goal-select').hasClass("border-red")){
      $('#goal-select').removeClass("border-red");
    };
   });

     $('#estimate-select').on("change", function(){
    // console.log("Im typing in the title");
    if($('#estimate-select').hasClass("border-red")){
      $('#estimate-select').removeClass("border-red");
    };
   });

  $('#difficulty-select').on("change", function(){
    // console.log("Im typing in the title");
    if($('#difficulty-select').hasClass("border-red")){
      $('#difficulty-select').removeClass("border-red");
    };
   });

    $('#type-select').on("change", function(){
    // console.log("Im typing in the title");
    if($('#type-select').hasClass("border-red")){
      $('#type-select').removeClass("border-red");
    };
   });

    $('#importance-select').on("change", function(){
    // console.log("Im typing in the title");
    if($('#importance-select').hasClass("border-red")){
      $('#importance-select').removeClass("border-red");
    };
   });

  $('#start_date').on("change", function(){
    // console.log("Im typing in the title");
    if($('#start_date').hasClass("border-red")){
      $('#start_date').removeClass("border-red");
    };
   });

    $('#end_date').on("change", function(){
    // console.log("Im typing in the title");
    if($('#end_date').hasClass("border-red")){
      $('#end_date').removeClass("border-red");
    };
   });


   $('#project-select').on("change", function(){
    console.log("The project has been changed");

    // console.log("Im typing in the title");
    if($('#project-select').hasClass("border-red")){
      $('#project-select').removeClass("border-red");
    };

    updateGoalList($('#project-select option:selected').val());

  // var a = $('#project-select option:selected').val();
  //   // var $this = $(this);
  //   console.log(a);

  //   $('#goal-options').show();
  //   createGoalsOptions(a);

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


        // data['importance'] = $('#importance').val();
        data['importance'] = $('#importance-select option:selected').val();
        data['difficulty'] = $('#difficulty-select option:selected').val();
        // data['difficulty'] = $('#difficulty').val();
        data['start_date'] = $('#start_date').val();
        data['end_date'] = $('#end_date').val();
        // data['estimate'] = $('#hours_estimate').val();
        // data['goal_id'] = $('#goal-options option:selected').val();
        data['estimate'] = $('#estimate-select option:selected').val();

        data['completed'] = $('#completed' + taskID).is(":checked");
        // data['card_id'] = cardDetails["card_id"];
        // data['card_name'] = cardDetails["name"];
        data['card_name'] = $('#task_title').val();
        data['card_description'] = $('#task_description').val();
        // data['url'] = cardDetails["url"];
        // data['shortlink'] = cardDetails["shortlink"] ;
        data['goal_id'] = $('#goal-options option:selected').val();
        data['project_id'] = $('#project-select option:selected').val();

        console.log(data);

    if($('.task-form-header').attr("id") ==""){

      path = "/users/" + gon.user_id + "/tasks";
      method = "POST";
      goal_id = $('#goal-options option:selected').val();
      // data['goal_id'] = $('#goal-options option:selected').val();
      // data['project_id'] = $('#project-options option:selected').val();

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
          })
         
          createTaskRecord(goal_id);
          if(method == "PUT"){
            addNewComment(taskID, "resindex");
          }
          taskInputReset();
        
      };

      $(document.body).on('click','#project-button', function(){
        if(!$('#menu-container').hasClass('frozen')){
          console.log("clicked the project button");
          $('.projectSel').val('');
          $('.goalSel').val('');
          createProjectList(0);
          taskInputReset();
        };
      });


      var createProjectList = function(menuOrOptions){
        console.log("in create project list")

        $.getJSON("users/"+ gon.user_id +"/projects", function(data){

          // $('#project-button').fadeOut(500);

            var menuItems = $("#menu-container");
            var projectOptions = $("#project-select");
            var goalOptions = $("#goal-select");
            var projectOption;
            var projectItem;
            var projectInitialOption;
            menuItems.html('');
            projectOptions.html('');
            goalOptions.html('');

            projectInitialOption = '<option value="none">Select prize</option>';
            menuItems.append('<div class="well well-lg" id="project-button">Prizes</div>');

            goalInitialOption = '<option value="none">Select a project first</option>';

            projectOptions.append(projectInitialOption);
            goalOptions.append(goalInitialOption);

            $.each(data, function(i, project){
              if(menuOrOptions == 0){
                console.log(project.no_of_goals)

                if(project.no_of_goals === null){
                  x = 0;
                }else{
                  x = project.no_of_goals;
                };
              projectItem = '<button class="btn-warning btn-xs pull-right new-goal" value='+ project.id +'>New Stuff</button><div class="well well-sm projects" id=' + project.id + '>' + project.name + '<span class ="pull-right badge">' + x + '</span></div></div>';
              
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

    // $(document.body).on('hover', '#task-panel', function(){
    //   console.log("hello");
    // });


      var createGoalsList = function(projectID){
        var x;
        console.log("in createGoalsList")

        var menuItems = $('#menu-container');
  

        // menuItems.html('');

        if($('.goals').length==0){

        $.getJSON("/projects/"+ projectID +"/goals", function(data){
          console.log(data);

           $.each(data, function(i, goal){
            console.log(goal.no_of_tasks);

                if(goal.no_of_tasks === null){
                  x = 0;
                }else{
                  x = goal.no_of_tasks;
                };
              var goalItem = '<div class="well well-sm goals project' + projectID + ' " id=' + goal.id + '> ' + goal.name + '<span class ="pull-right badge">  ' + x + '</span></div>';
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
            goalInitialOption = '<option value=0 >Create some goals for the project</option>';
            goalOptions.append(goalInitialOption);
          }else{

            goalInitialOption = '<option value="none">Select goal</option>';
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

              var listItem = '<div class="panel panel-default tpanel" value='+ task.id + ' ><button class="commentButton btn btn-xs btn-warning pull-right" value='+ task.id +' >Add a note</button><div class="panel-heading task-panel" value='+ task.id +' >' + task.card_name +'</div><div class="list-group-item" id= '+ task.id +'>'+ task.id + '<span class ="pull-right resindex badge" value='+task.id +'> Resindex : ' + task.resindex + '</span><p>Work done to date : ' + effortHours + ' hours ' + newEffortMins + ' mins<span class="pull-right"><button id='+ task.id + ' class="recordButton btn btn-xs btn-warning" >Start work</button></span></p><p> Start date :' + task.start_date +'<span><div class="pull-right" value='+ task.id +'><label for="completed">Completed</label><input type="checkbox" class="completed" id="completed'+task.id +'" name="completed" value='+ task.id +'></div></span></p> <p>End Date : '+ task.end_date + '</p><p><button class="editButton btn btn-warning btn-xs pull-right" value='+ task.id + ' >Edit task</button></p></div><div class="control-group"><div class="controls"><textarea class="form-control task_description_on_task" value='+ task.id +' style="display:none" placeholder="Add details">' + task.card_description + '</textarea></div></div>';
               
              listItems.append(listItem);
        

              if(task.completed===true){
                $('#completed' + task.id).attr('checked', true);
              };
            };
          });
          listItems.fadeIn(1000);
          $.each(data, function(i,task){
              resindexColour(task.id, task.resindex);
          });
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
      validateTaskForm();
  
      // createTask();

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
    if(!$('#menu-container').hasClass('frozen')){
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
  };
  });

  $(document.body).on('click', '.goals',function(){
    if(!$('#menu-container').hasClass('frozen')){
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
    };
  });


    $(document.body).on('click', '.editButton', function(){
      $this = $(this);
      console.log($this);

      //show task frame

      $('#comments-panel').animate({bottom: "-200px"}, 1000).fadeOut();
      $('#input-panel').animate({top: "0px"},1000).fadeIn();
    
      taskID = $this.parent().parent().attr("id");
      // console.log(data);

      $.getJSON("/users/" + gon.user_id +"/tasks/" + taskID, function(data){
        console.log(data);

          $('.task-form-header').attr('id', taskID);

          // $('#slider-estimate').slider({value: data.estimate});
          // $('#hours_estimate').val(data.estimate);
          // $('#slider-difficulty').slider({ value: data.difficulty });
          // $('#difficulty').val(data.difficulty);
          // $('#slider-importance').slider({value: data.importance});
          // $('#importance').val(data.importance)
          $('#estimate-select').val(data.estimate);
          $('#difficulty-select').val(data.difficulty);
          $('#importance-select').val(data.importance);
          // $('#goal-options').fadeOut();
          $('#project-select').val(data.project_id);
          // updateGoalList(data.project_id);
          // $('#goal-select').val(data.goal_id);
          // $('#goal-select').show();
          $('#start_date').val(data.start_date);
          $('#end_date').val(data.end_date);
          // $('#task_title').text(data.card_name);
          $('#task_title').val(data.card_name);
          $('#task_description').val(data.card_description);
          $('#new-task').text('Update');
          $('#new-task').addClass('update');
          $('.task-form-header').text('Update Task');
            updateGoalList(data.project_id);
          $('#goal-select').val(data.goal_id);
          //need to add project and goal

        
      });
    });

    var taskInputReset = function(){
      console.log("in input clear");
      $('.task-form-header').attr('id', '');
         // $('#slider-estimate').slider({value: 5});
         //  $('#hours_estimate').val(5);
         //  $('#slider-difficulty').slider({ value: 3 });
         //  $('#difficulty').val(3);
         //  $('#slider-importance').slider({value: 3});
         //  $('#importance').val(3)
          $('#estimate-select').val('none');
          $('#difficulty-select').val('none');
          $('#importance-select').val('none');
          $('#start_date').val('');
          $('#end_date').val('');
          // $('#task_title').text(data.card_name);
          $('#task_title').val('');
          $('#task_description').val('');
          $('#new-task').text('Post');
          $('#new-task').removeClass('update');
          $('#new-task').addClass('new-task');
          $('.task-form-header').text('New job')
          // $('#goal-select').fadeOut();
          $('#goal-select').html('');
          $('#goal-select').append('<option value="none">Select a project first</option>');

          $('#goal-select').val('none')
          $('#project-select').val('none')
    };

    var updateGoalList = function(a){
      // var a = $('#project-select option:selected').val();
    // var $this = $(this);
    console.log(a);

    // $('#goal-options').fadeIn();
    createGoalsOptions(a);

   };

    $('#today').on('click', function(){
      console.log("clicked today button");
        var d = new Date;
        var dateDay = d.getDate();
        var dateMonth = d.getMonth() + 1;
        var dateYear = d.getFullYear();
        var dateStart = dateDay +"/" + dateMonth + "/" + dateYear;

      $('#start_date').val(dateStart);
      $('#end_date').val(dateStart);
    });

       $('#tomorrow').on('click', function(){
      console.log("clicked tomorrow button");
        var tomorrow = new Date;
        var d = new Date;
        var dateDay = d.getDate();
        var dateMonth = d.getMonth() + 1;
        var dateYear = d.getFullYear();
        var dateStart = dateDay +"/" + dateMonth + "/" + dateYear;
        tomorrow.setDate(tomorrow.getDate() + 1);

        var dateDayEnd = tomorrow.getDate();
        var dateMonthEnd = tomorrow.getMonth() + 1;
        var dateYearEnd = tomorrow.getFullYear();
        var dateEnd = dateDayEnd + "/" + dateMonthEnd + "/" + dateYearEnd;


      $('#start_date').val(dateStart);
      $('#end_date').val(dateEnd);
    });


    $(document.body).on('click', '.recordButton', function(){
      var goalId;
      $this = $(this);
       taskId = parseInt($this.parent().parent().parent().attr('id'));

      if($this.hasClass("recording")){

        endRecording($this);

        goalId = $('.goalSel').val();

        createTaskRecord(goalId)

        addNewComment(taskId, "effort");
        $('#menu-container').removeClass('frozen');


      }else{

          taskId = parseInt($this.parent().parent().parent().attr('id'));
          userId = gon.user_id;
          console.log(taskId);
          // taskId = parseInt($this.siblings().attr('id'));
          // alert(cardId);

          $this.addClass("recording");

          var commentButtonToKeep = $('.commentButton[value=' + taskId +']');
          var taskPanelToKeep = $('.tpanel[value=' + taskId + ']');
          var editButtonToRemove = $('.editButton[value=' + taskId + ']');

          console.log(commentButtonToKeep);
          console.log(taskPanelToKeep);
          console.log(editButtonToRemove);

          commentButtonToKeep.addClass("recording");
          taskPanelToKeep.addClass("recording");
          editButtonToRemove.addClass("recording");
          $('#menu-container').addClass('frozen');
          $('.task_description_on_task[value='+ taskId + ']').show();


          $this.parent().parent().parent().addClass("active");
          $this.parent().parent().prepend('<span id="hours"></span><span id="minutes"></span><span id="seconds"></span></p><p>');

          $this.text("work session started");
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
      toggleNewTaskMenuItem(1);

      stopClock();


      // $('.projects').on();
      // $('.goals').on();
      // $('#project-button').on();

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
        // $('.recordButton:not(.recording)').fadeOut();
        $('.tpanel:not(.recording)').fadeOut();
        $('.editButton.recording').fadeOut();
        toggleNewTaskMenuItem(0);
        showCommentPanel(taskId);
        // $('.projects').click(function(){return false;});
        // $('#project-button').off('click');
        // $('.goals').off('click');

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
     var initialCommentType = '<option value="none">Select Note type</option>';
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

  });

  var checkComment = function(){
    var foundError = false;
   
      if($('#comment-text').val()==""){
        $('#comment-text').addClass('border-red');
        foundError = true;
      };
      if( $('#type-select option:selected').val()=="none"){
        $('#type-select').addClass('border-red');
        foundError = true;
      };
      return foundError;
  };



    var addNewComment = function(taskId, commentType){
          console.log("in new comment")
          var commentError = false;
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
            var x = checkComment();
              if(!x){
              
            newComment = $('#comment-text').val();
            commentType = $('#type-select option:selected').val();
            }
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
          if(!x){

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
          $('#comment-text').val("");
          $('#type-select option:selected').val("none");
          };
        };
      

var stopClock = function(){

  clearInterval(clock)
}

var addProject = function(){

  if($('#project-name').val()==""){

    $('#project-name').addClass('border-red');
  }else{

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
};

var addGoal = function(){

  console.log("added new goal");

  if($('#goal-name').val()==""){
    console.log("this fails");
    $('#goal-name').addClass('border-red');
  }else{

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
          $('#comment-text').val("");
          $('#type-select option:selected').val("none");

        }
      },
      close: function() {
        dialogComment.dialog("close"); 
          $('#comment-text').val("");
          $('#type-select option:selected').val("none");
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
var taskId = $this.parent().first().attr("value");
// $('#input-panel').animate({bottom: "-200px"}, 500).fadeOut();
// $('#comments-panel').animate({top: "0px"}, 500).fadeIn();
showCommentPanel(taskId);
// var taskId = $this.children().children().first().attr("value");
console.log(taskId);

// showComments(taskId);

});

var toggleNewTaskMenuItem = function(switchInt){

    if(switchInt == 0){
      $('#blank_task').hide();
    }else{
      $('#blank_task').show();
    };

};


var showCommentPanel = function(taskId){
$('#input-panel').animate({bottom: "-200px"}, 500).fadeOut();
$('#comments-panel').animate({top: "0px"}, 500).fadeIn();
showComments(taskId);
};

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

// var resindexColour = function(taskId, resindex){
//   switch(resindex){
//     case (>1 && <1.5):

//     $('.resindex.badge[value='+ taskId']').addClass('warning');

//     break;
//     case (>0 && <1):
//     $('.resindex.badge[value='+ taskId']').addClass('success');

//     break;

//     case (>1.51):
//        $('.resindex.badge[value='+ taskId']').addClass('danger');
//     break;
//   }

// }

};

$(document).ready(main)