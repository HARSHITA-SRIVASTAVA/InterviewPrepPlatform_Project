const ActivityItem=({ item })=>{
    return(
        <div className="bg-gray-50 p-3 rounded-lg border">
            <p className="font-medium">
                {item.problem?.title}
            </p>
            <p className="text-sm text-gray-500">
                {item.problem?.difficulty}
            </p>
            <p className="text-sm mt-1">    {/* mt->margin top */}
                Status: {item.status}
            </p>
            <p className="text-xs text-gray-400 mt-1">
                {new Date(item.updatedAt).toLocaleString()}
            </p>
        </div>
    );
};

export default ActivityItem;