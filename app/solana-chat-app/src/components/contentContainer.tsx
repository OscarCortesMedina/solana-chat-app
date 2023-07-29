import React, { ReactNode, useState } from "react";

type Props = {
    children: ReactNode,
    loading: boolean
  };

const ContentContainer: React.FC<Props> = ({children, loading}) => {

  return (
    <div className={"bg-indigo-500 flex min-h-screen justify-center relative "}>

        <div className={(loading? 'animate-pulse':'')+" mt-2 mb-1 flex items-center justify-center h-screen px-2"}>
        <div className="bg-white p-8 rounded shadow-lg">
            {children}
        </div>
        </div>

    </div>
  );
};

export default ContentContainer;