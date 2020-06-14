$(document).ready(function () {    
    var i;
    for (i = 0; i < 8; i++) {
        $('#placeholder_items').append('<div class="item_main_card item_card_border col-md-offset-1 col-md-6"><div class="  img_container"><img class="item_img placeholder_img" src="" alt=""></div>' +
            '<div class="row item_detail_chunk font_size_14 sans_font"><div class=" col-md-7 placeholder_divs"></div><div class="m_t_5 col-md-12 placeholder_divs"></div></div>' +
            '<hr class="custom_line"><div class="chunk"><div class="deal_btn_pos m_b_10 col-md-4 placeholder_divs"></div></div>');
    }
    
    $('#edit_me').on('click', function () {
        var id = $('#item_id').val();
        console.log('id=' + id);

        window.open("/edit_item?id=" + id, "_blank");
    })

    $('#delete_me').on('click', function () {
        var id = $('#item_id').val();
        console.log('id=' + id);

        $.post('/delete_item', { item_id: id })
            .done(function (result) {
                alert(result);
            })
    })

    $('#update').on('click', function () {
        var loc = window.location.href
        var params = loc.split("=");
        
        var id = params[1];
        var name = $('#name').val();
        var desc = $('#desc').val();
        var item_type = $('#item_type').val();
        var pic_name = $('#pic').val();
        pic_name = pic_name.substring(12);

        if (!name || !desc || !item_type || !pic_name) {
            setTimeout(function(){
                alert('Please fill missing fields!!', function(){
                });
            }, 100);
            return false;
        }
        if (item_type == 'mobile') {
            // if type if mobile
            var mob_proc   = $('#mob_proc').val();
            var mob_ram    = $('#mob_ram').val();
            var mob_screen = $('#mob_screen').val();
            var color      = $('#color').val();

            var attributes = [mob_proc, mob_ram, mob_screen, color];
        } else {
            var lap_proc = $('#lap_proc').val();
            var lap_ram  = $('#lap_ram').val();
            var lap_hd = $('#lap_hd').val();
            
            var attributes = [lap_proc, lap_ram, lap_hd];
        }

        var file_data = $("#pic").val();

        var form_data = new FormData(); 

        if (file_data == undefined)
        {
            setTimeout(function(){
                alert('Dont miss to upload image!!', function(){
                    
                });
            }, 100);
            return false;
        }

        $.post('/update_item', { id:id, name: name, desc: desc,type: item_type, attributes: attributes, pic_name : pic_name})
        .done(function (result) {
            console.log(result);
            alert(result.msg);
            window.location.href = "/items";
        })
    })
})

$(window).load(function () {
    setTimeout(function () {
        $.post('/items', {})
            .done(function (result) {
                console.log(result);
                $('#placeholder_items').css('display', 'none');
                
                $.each(result.data, function (key, value) {
                    var attr = '';
                    if (value.type == 'mobile') {
                        attr = '<div><i class="material-icons">developer_board</i><span class="font_size_14">  ' + value.processor + '</span></div><div><i class="material-icons">memory</i><span class="font_size_14">  ' + value.ram + '</span></div><div><i class="material-icons">airplay</i><span class="font_size_14">  ' + value.screen + '</span></div><div><i class="material-icons">colorize</i><span class="font_size_14">  ' + value.color + '</span></div>';
                    } else {
                        attr = '<div><i class="material-icons">developer_board</i><span class="font_size_14">  ' + value.processor + '</span></div><div><i class="material-icons">memory</i><span class="font_size_14">  ' + value.ram + '</span></div><div><i class="material-icons">airplay</i><span class="font_size_14">  ' + value.hd + '</span></div>';
                    }
                    $('#show_items').append('<div value=' + value.id + '" class="product_info item_main_card item_card_border col-md-offset-1 col-md-6 "><div class="img_container"><img class="item_img" src=' + value.pic + ' alt=' + value.name + '></div><div class="row item_detail_chunk font_size_14 sans_font"><div><span class="item_title">' + value.name + '</span></div></div><hr class="custom_line"><div class="col-md-12 col-sm-12 col-lg-12"><div><p>' + attr + '</p></div></div>' +
                    '<div class="row"><div class=""><input type="button" value="See details" id='+value.id+' class=" btn btn-info header_nav"></div></div></div > ');
        
                })

                // for single item 
                $('#placeholder_item_data').css('display', 'none');

                var value = result.data[0];
                var attr = '';
                if (value.type == 'mobile') {
                    attr = '<div><i class="material-icons">developer_board</i><span class="font_size_14">  ' + value.processor + '</span></div><div><i class="material-icons">memory</i><span class="font_size_14">  ' + value.ram + '</span></div><div><i class="material-icons">airplay</i><span class="font_size_14">  ' + value.screen + '</span></div><div><i class="material-icons">colorize</i><span class="font_size_14">  ' + value.color + '</span></div>';
                } else {
                    attr = '<div><i class="material-icons">developer_board</i><span class="font_size_14">  ' + value.processor + '</span></div><div><i class="material-icons">memory</i><span class="font_size_14">  ' + value.ram + '</span></div><div><i class="material-icons">airplay</i><span class="font_size_14">  ' + value.hd + '</span></div>';
                }
                $('#detail_item_info').append('<div id="single_item" value=' + value.id + '" class="item_main_card item_card_border col-md-offset-1 col-md-10 "><input type="hidden" id="item_id" value=' + value.id + '><div class="img_container full_height"><img class="item_img full_height" src=' + value.pic + ' alt=' + value.name + ' title=' + value.name + ' ></div><div class="row item_detail_chunk font_size_14 sans_font"><div><span class="item_title">' + value.name + '</span></div></div><hr class="custom_line"><div class="col-md-12 col-sm-12 col-lg-12"><div><p>' + attr + '</p></div>' +
                    '<hr class="custom_line"><div class="row padding_10"><div class="col-md-12"><span>' + value.desc + '<span></div></div></div ></div > ' +
                    '<div class="row"><div class="padding_10 col-md-12"></div></div>');

            
            })
    }, 2000)

})

$('#log_me_in').on('click', function () {
    var login_id = $('#id').val();
    var password = $('#password').val();

    $.post('/login', { id: login_id, password: password })
        .done(function (data) {
            console.log(data);
            if (data.status == 0) {
                alert(data.msg);
                $('#id').val('');
                $('#password').val('');
            } else {
                window.location.href = "/items";
            }
        })
})

$('#item_type').on('change', function () {
    var item_type = $('#item_type').val();

    console.log(item_type);
    $('#item_attr').html('');

    if (item_type == 'mobile') {
        $('#item_attr').append('<div class="row form-group"><input required class="form-control col-md-5" value="" type="text" name="mob_proc" id="mob_proc" placeholder="Mobile Processor"></div>');
        $('#item_attr').append('<div class="row form-group"><input required class="form-control col-md-5" value="" type="text" name="mob_ram" id="mob_ram" placeholder="Mobile Ram"></div>');
        $('#item_attr').append('<div class="row form-group"><input required class="form-control col-md-5" value="" type="text" name="mob_screen" id="mob_screen" placeholder="Screen Size"></div>');
        $('#item_attr').append('<div class="row form-group"><input required class="form-control col-md-5" value="" type="text" name="color" id="color" placeholder="Color"></div>');
    } else if (item_type == 'laptop') {
        $('#item_attr').append('<div class="row form-group"><input required class="form-control col-md-5" value="" type="text" name="lap_proc" id="lap_proc" placeholder="Laptop Processor"></div>');
        $('#item_attr').append('<div class="row form-group"><input required class="form-control col-md-5" value="" type="text" name="lap_ram" id="lap_ram" placeholder="Laptop Ram"></div>');
        $('#item_attr').append('<div class="row form-group"><input required class="form-control col-md-5" value="" type="text" name="lap_hd" id="lap_hd" placeholder="HD Capacity"></div>');
        
    }
    
})

// create new item
$('#submit').on('click', function () {
    var name = $('#name').val();
    var desc = $('#desc').val();
    var item_type = $('#item_type').val();
    var pic_name = $('#pic').val();
    pic_name = pic_name.substring(12);

    if (!name || !desc || !item_type || !pic_name) {
        setTimeout(function(){
            alert('Please fill missing fields!!', function(){
            });
        }, 100);
        return false;
    }
    if (item_type == 'mobile') {
        // if type if mobile
        var mob_proc   = $('#mob_proc').val();
        var mob_ram    = $('#mob_ram').val();
        var mob_screen = $('#mob_screen').val();
        var color      = $('#color').val();

        var attributes = [mob_proc, mob_ram, mob_screen, color];
    } else {
        var lap_proc = $('#lap_proc').val();
        var lap_ram  = $('#lap_ram').val();
        var lap_hd = $('#lap_hd').val();
        
        var attributes = [lap_proc, lap_ram, lap_hd];
    }

    var file_data = $("#pic").prop("files")[0]; 

    var form_data = new FormData(); 

    if (file_data == undefined)
    {
        setTimeout(function(){
            alert('Dont miss to upload image!!', function(){
                
            });
        }, 100);
        return false;
    }

    $.post('/create', { name: name, desc: desc,type: item_type, attributes: attributes, pic_name : pic_name})
    .done(function (result) {
        console.log(result);
        alert(result.msg);
        $("#close_modal").click();
        window.location.href = "/items";
    })
})

jQuery("input#pic").change(function () {
    var file_data = $("#pic").prop("files")[0]; 
    var form_data = new FormData(); 

    form_data.append("pic", file_data);
    console.log('calling API...');

    $.ajax({
        url: "/save_img",
        type: 'POST',
        dataType: 'script',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (result) {
            console.log(result);
        }
    })
})

// get one item data
$(".product_info").on('click', function () {
    var id = $(this).attr('id');
    console.log('id=' + id);
})

$('#logout').on('click', function () {
    $.post('/logout', {})
        .done(function () {
            
        })
    
    window.location.href = ("/");
})