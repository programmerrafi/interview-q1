import React from 'react'
import Switchs from "../Switchs";

function BlogStories({handleClickDelete,filteredLong,checkedLongStroy,checkedLong,checkedShortStroy,checkedShort,filteredShort}) {
  return (
    <div className="flex items-center gap-5 flex-wrap bg-[#29292B] p-2 rounded mb-5">
    <div className="flex items-center gap-1">
      <h2>i</h2>
      <h4 className="font-bold">Blog</h4>
    </div>
    <div className="flex items-center gap-1">
      <h4
        onClick={handleClickDelete}
        className="text-sm text-[#a0645b] cursor-pointer"
      >
        Delete all
      </h4>
    </div>
    <div className="flex items-center gap-2">
      <h2 className="w-5 h-5 rounded-full flex items-center justify-center bg-[#3D3D3F] text-[11px]">
        {filteredLong?.length}
      </h2>
      <h4 className="font-semibold text-sm text-gray-300">
        Long stroies
      </h4>
      <Switchs
        checkedLongStroy={checkedLongStroy}
        checkedLong={checkedLong}
        long
      />
    </div>
    <div className="flex items-center gap-2">
      <h2 className="w-5 h-5 rounded-full flex items-center justify-center bg-[#3D3D3F] text-[11px]">
        {filteredShort?.length}
      </h2>
      <h4 className="font-semibold text-sm text-gray-300">
        Short stroies
      </h4>
      <Switchs
        checkedShortStroy={checkedShortStroy}
        checkedShort={checkedShort}
        short
      />
    </div>
  </div>
  )
}

export default BlogStories