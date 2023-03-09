<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-primary mb-2 sticky-top">
    <div class="container-fluid"><a class="navbar-brand" href="/">MCU Go Open<!--img src="/img/logo.svg" width="80" height="30" /--><small class="badge rounded-pill bg-secondary">Alpha</small></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" aria-current="page" href="/courses/async">課程</a></li>
            <li class="nav-item"><a class="nav-link disabled" href="/arrange">模擬排課</a></li>
            <li class="nav-item"><a class="nav-link" href="//forms.gle/9zNafkf9hC5AWB7v6" target="_blank">
                意見回饋
                <i class="fas fa-external-link-alt"></i></a></li>
        </ul>
        <ul class="navbar-nav flex-wrap ms-md-auto">
            <li class="nav-item"><a class="nav-link" href="/auth/login">登入</a></li>
        </ul>
        </div>
    </div>
    </nav>

</template>

<script>
export default {
    data: () => {
        return {
            menus: ['課程查詢', '意見回饋']
        }
    },
}
</script>