/**
 * Created by munk on 18-08-16.
 */
export const enum EItemCategory {
    backlog,
    inProgress,
    review,
    done
}

export function fromStringToEnum(value: string){
    switch (value){
        case "backlog":
            return EItemCategory.backlog;
        case "inProgress":
            return EItemCategory.inProgress;
        case "review":
            return EItemCategory.review;
        case "done":
            return EItemCategory.done;
    }
}
