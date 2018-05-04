// JavaScript Document
function adsSel(obj){
	 dom=obj.dom;
	var provinceDom=dom.find('.province');
	var cityDom=dom.find('.city');
	var detailDom=dom.find('.detail');
	
	// 默认下拉选项
    var defaultOp = '<option value="0">请选择</option>';
	
    var country = [];
    var province = [];
    var city = [];
    var detail = [];
	 	initData();
        // 初始化省
        initProvince();
        // 注册 省 下拉选中事件
        onProvinceChange();
        // 注册 市 下拉选中事件
        onCityChange();

    function initData() {
		/*var json = $.get("http://api.jdsq360.com/ExpApi/common/area")*/
        for (var i in json) {
            var item = json[i];
            if (item.levelType == 0) {
                country.push(item);
            } else if (item.levelType == 1) {
                province.push(item);
            } else if (item.levelType == 2) {
                city.push(item);
            } else if (item.levelType == 3) {
                detail.push(item);
            } else {
                console.error('levelType error');
				
            }
        }
    }

    function initProvince() {
        for (var i in province) {
            var item = province[i];
            // TODO 这个地方所有的value应该是id之类的唯一标识
            var op = '<option value="' + item.id + '">' + item.name + '</option>';
            provinceDom.append(op);
        }
    }

    function onProvinceChange() {
        provinceDom.change(function () {
            // 重置 栋号 联动
            resetCity();
            var o = $(this);
            var value = o.children('option:selected').val();
            // 选中的item不为 请选择 的时候联动
            if (value != 0) {
                cityDom.html(defaultOp);
                var flag = 0;
                $.each(city, function (i, x) {
                    // 当前循环的小区名字=选中的小区名字
                    if (x.parentId == value) {
                        var op = '<option value="' + x.id + '">' + x.name + '</option>';
                        if (flag === 0) {
                            op = '<option selected value="' + x.id + '">' + x.name + '</option>';
                        }
                        cityDom.append(op);
                        flag++;
                    }
                });
            }
            setDetail();
        });
    }

    function onCityChange() {
        cityDom.change(function () {
            // 重置 单元 联动
            resetDetail();
            var o = $(this);
            var value = o.children('option:selected').val();
            // 选中的item不为 请选择 的时候联动
            if (value != 0) {
                detailDom.html(defaultOp);
                var flag = 0;
                $.each(detail, function (i, x) {
                    if (x.parentId == value) {
                        var op = '<option value="' + x.id + '">' + x.name + '</option>';
                        if (flag === 0) {
                            op = '<option selected value="' + x.id + '">' + x.name + '</option>';
                        }
                        detailDom.append(op);
                        flag++;
                    }
                });

            }
        });
    }

    function setDetail() {
        var value = cityDom.val();
        if (value != 0) {
            detailDom.html(defaultOp);
            var flag = 0;
            $.each(detail, function (i, x) {
                if (x.parentId == value) {
                    var op = '<option value="' + x.id + '">' + x.name + '</option>';
                    if (flag === 0) {
                        op = '<option selected value="' + x.id + '">' + x.name + '</option>';
                    }
                    detailDom.append(op);
                    flag++;
                }
            });

        }
    }

    function resetCity() {
        cityDom.html(defaultOp);
        detailDom.html(defaultOp);
    }

    function resetDetail() {
        detailDom.html(defaultOp);
    }
	
 }
   