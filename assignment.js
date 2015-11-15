
var animals_template, category_template, modal_template;

var current_category, current_data, pos;
var current_animal;

$(document).ready(function() {

    var source = $("#animals-template").html();
    animals_template = Handlebars.compile(source);
    source = $("#category-template").html();
    category_template = Handlebars.compile(source);
    source = $("#modal-template").html();
    modal_template = Handlebars.compile(source);

    current_category = animals_data.category[2];
    current_data = animals_data;
    current_animal = current_category[0];

    function show(template, data) {
        var html = template(data);
        $("#contentMAIN").html(html);
    }


    $("#animals-tab").click(function() {
        $(".active").removeClass("active");
        $("#animals-tab").addClass("active");
        show(animals_template, current_data);
        current_data = animals_data;

        $(".categoryThumbnail").click(function() {
            $(".active").removeClass("active");
            $("#category-tab").addClass("active");
            var index = $(this).data("id");
            current_category = animals_data.category[index];
            show(category_template, current_category);
            $(".animalsThumbnail").click(function() {
                var index = $(this).data("id");
                current_animal = current_category.animals[index];
                var html = modal_template(current_animal);
                $("#ModalSHOW").html(html);
                $("#animalModal").modal("show");
            });

        });

    });




    $("#category-tab").click(function() {
        $(".active").removeClass("active");
        $("#category-tab").addClass("active");
        current_data = animals_data;
        show(category_template, current_category);

        $(".animalsThumbnail").click(function() {
            var index = $(this).data("id");
            current_animal = current_category.animals[index];
            var html = modal_template(current_animal);
            $("#ModalSHOW").html(html);
            $("#animalModal").modal("show");
        });
    });

    $("#animals-tab").click();


//});

// the search functionality
    // this happens when a key is pressed
    // inside the search box
    $("#searchbox").keypress(function (e) {
        current_data = animals_data;
        //e.preventDefault();

      // check if the key that was pressed
      // is the return key (it has id 13)
      // and only do the search if it is
      if (e.which == 13) {

        // get the search text which is the
        // contents of the search box
        var search_text = $("#searchbox").val();

        // print the search box
        // (this is an example of using
        // console.log for debugging)
        console.log(search_text) //added to git

        // create a new array of data with only
        // the data that contains the search string
        var filteredData = {
            category:animals_data.category.filter(function(d, index) {


          // use the filter function which returns
          // a new array that contains only the
          // elements of data.images for which
          // the function returns true
         // category: animals.name.filter(function(d){
         //category: category.name.filter(function(d){
            // return true if the name contains
            // the search text
            if (d.name.search(search_text) > -1){
              return true;
            }

            // return true if the category contains
            // the search text
            //if (d.category.search(search_text) > -1){
            //  return true;
        //    }

            // if we reach here it means we haven't
            // found a match so return false
            return false;
          })
        };

        // pass the newly filtered data into
        // the template to generate new html
        var html    = template(filteredData);
        $("#contentMAIN").html(html);

        // display the modal when you click on a thumbnail
        $(".animalsThumbnail").click(ModalSHOW);
      }
    });
});
