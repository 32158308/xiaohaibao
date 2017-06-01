class Model{

    // 单例模式
    static getInstance() {
        if (!Model.instance) {
            Model.instance = new Model();
        }
        return Model.instance;
    }

    run(param){
        return param;
    }

}

module.exports = Model;