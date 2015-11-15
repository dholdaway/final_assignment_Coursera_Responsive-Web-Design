
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


});

$('#searchbox').keypress(function(e){
  if(e.which ==13){
    var search_text = $('#searchbox').val();
    console.log(search_text)
    var filteredData ={
      category: animals_data.category.filter(function(d){
        if(d.name.search(search_text) > -1){
          return true;
        }
        if(d.description.search(search_text) > -1){
          return true;
        }
        return false;
      })
    };
    var html = template(filteredData);
    $('#contentMAIN').html(html);
  }
});
});
