import React from 'react'

const Widgets = () => {
  return (
    <>
      {/* Widgets Start */}
<div className="container-fluid pt-4 px-4 d-none">
    <div className="row g-4">
        <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="h-100 bg-secondary rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="mb-0">Messages</h6>
                    <a href="">Show All</a>
                </div>
                <div className="d-flex align-items-center border-bottom py-3">
                    <img className="rounded-circle flex-shrink-0" src="./src/assets/Admin/assets/img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                    <div className="w-100 ms-3">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0">Jhon Doe</h6>
                            <small>15 minutes ago</small>
                        </div>
                        <span>Short message goes here...</span>
                    </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-3">
                    <img className="rounded-circle flex-shrink-0" src="./src/assets/Admin/assets/img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                    <div className="w-100 ms-3">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0">Jhon Doe</h6>
                            <small>15 minutes ago</small>
                        </div>
                        <span>Short message goes here...</span>
                    </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-3">
                    <img className="rounded-circle flex-shrink-0" src="./src/assets/Admin/assets/img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                    <div className="w-100 ms-3">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0">Jhon Doe</h6>
                            <small>15 minutes ago</small>
                        </div>
                        <span>Short message goes here...</span>
                    </div>
                </div>
                <div className="d-flex align-items-center pt-3">
                    <img className="rounded-circle flex-shrink-0" src="./src/assets/Admin/assets/img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                    <div className="w-100 ms-3">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0">Jhon Doe</h6>
                            <small>15 minutes ago</small>
                        </div>
                        <span>Short message goes here...</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="h-100 bg-secondary rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0">Calendar</h6>
                    <a href="">Show All</a>
                </div>
                <div id="calendar"></div>
            </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="h-100 bg-secondary rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0">To Do List</h6>
                    <a href="">Show All</a>
                </div>
                <div className="d-flex mb-2">
                    <input className="form-control bg-dark border-0" type="text" placeholder="Enter task" />
                    <button type="button" className="btn btn-primary ms-2">Add</button>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                    <input className="form-check-input m-0" type="checkbox" />
                    <div className="w-100 ms-3">
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            <span>Short task goes here...</span>
                            <button className="btn btn-sm"><i className="fa fa-times"></i></button>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                    <input className="form-check-input m-0" type="checkbox" />
                    <div className="w-100 ms-3">
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            <span>Short task goes here...</span>
                            <button className="btn btn-sm"><i className="fa fa-times"></i></button>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                    <input className="form-check-input m-0" type="checkbox" checked />
                    <div className="w-100 ms-3">
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            <span><del>Short task goes here...</del></span>
                            <button className="btn btn-sm text-primary"><i className="fa fa-times"></i></button>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                    <input className="form-check-input m-0" type="checkbox" />
                    <div className="w-100 ms-3">
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            <span>Short task goes here...</span>
                            <button className="btn btn-sm"><i className="fa fa-times"></i></button>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center pt-2">
                    <input className="form-check-input m-0" type="checkbox" />
                    <div className="w-100 ms-3">
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            <span>Short task goes here...</span>
                            <button className="btn btn-sm"><i className="fa fa-times"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{/* Widgets End */}
    </>
  )
}

export default Widgets
