export function MockModel<T>(data: T): any {
    abstract class MockModel {
      static entityStub: T = data;
  
      constructor(data: T) {
        this.constructorSpy(data);
      }
  
      constructorSpy(data: T) {
        console.log('for spying on contructor');
      }
  
      static findOne() {
        return {
          exec: () => MockModel.entityStub,
        };
      }
  
      static find() {
        return {
          exec: () => [MockModel.entityStub],
        };
      }
  
      async save() {
        return MockModel.entityStub;
      }
    }
  
    return MockModel;
  }