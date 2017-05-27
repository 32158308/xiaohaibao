class Test{

    // 单例模式
    static getInstance() {
        if (!Test.instance) {
            Test.instance = new Test();
        }
        return Test.instance;
    }

    run(param){
        return param;
    }

}

module.exports = Test;