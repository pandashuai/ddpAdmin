import Vue from 'vue';
// import ElementUI from 'element-ui';

// Vue.use(ElementUI);
// 按需引入
import {
    Pagination,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    // TimeSelect,
    // TimePicker,
    // Popover,
    Tooltip,
    // Breadcrumb,
    // BreadcrumbItem,
    Form,
    FormItem,
    // Tabs,
    // TabPane,
    Tag,
    // Tree,
    Alert,
    // Slider,
    Icon,
    // Row,
    // Col,
    // Upload,
    // Progress,
    // Badge,
    Card,
    // Rate,
    // Steps,
    // Step,
    // Carousel,
    // CarouselItem,
    // Collapse,
    // CollapseItem,
    // Transfer,
    // Container,
    // Header,
    // Aside,
    // Main,
    // Footer,
    Loading,
    MessageBox,
    Message,
    Notification
} from 'element-ui';

// 分页
Vue.use(Pagination);
// 对话框
Vue.use(Dialog);
// 下拉菜单
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
// 导航条
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
// input
Vue.use(Input);
Vue.use(InputNumber);
// 单选框
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
// 多选框
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
// Switch 开关
Vue.use(Switch);
// Select 选择器
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
// 按钮
Vue.use(Button);
Vue.use(ButtonGroup);
// 表格
Vue.use(Table);
Vue.use(TableColumn);
// 日期选择器
Vue.use(DatePicker); // 日期
// Vue.use(TimeSelect);
// Vue.use(TimePicker); // 时间
// 弹出框
// Vue.use(Popover);
// 文字提示
Vue.use(Tooltip);
// 面包屑
// Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
// 表单
Vue.use(Form);
Vue.use(FormItem);
// 标签页
// Vue.use(Tabs);
// Vue.use(TabPane);
// 标签
Vue.use(Tag);
// 树形控件
// Vue.use(Tree);
// Alert 警告
// Vue.use(Alert);
// 滑块
// Vue.use(Slider);
// 图标
Vue.use(Icon);
// 布局
// Vue.use(Row);
// Vue.use(Col);
// Upload 上传
// Vue.use(Upload);
// 进度条
// Vue.use(Progress);
// 标记
// Vue.use(Badge);
// 卡片
Vue.use(Card);
// 评分
// Vue.use(Rate);
// 步骤条
// Vue.use(Steps);
// Vue.use(Step);
// 走马灯 幻灯片
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// 折叠面板
// Vue.use(Collapse);
// Vue.use(CollapseItem);
// 穿梭框
// Vue.use(Transfer);
// 布局容器
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
// Vue.use(Footer);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
// Alert 警告
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;