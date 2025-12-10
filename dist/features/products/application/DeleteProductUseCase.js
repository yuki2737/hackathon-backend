"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductUseCase = void 0;
class DeleteProductUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        await this.repository.delete(id);
    }
}
exports.DeleteProductUseCase = DeleteProductUseCase;
//# sourceMappingURL=DeleteProductUseCase.js.map